import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => { return response.data }

const requests = {
    get: (url: string) => { return axios.get(url).then(responseBody); },
    post: (url: string, body: {}) => { return axios.post(url, body).then(responseBody); },
    put: (url: string, body: {}) => { return axios.put(url, body).then(responseBody); },
    del: (url: string) => { return axios.delete(url); }
}

const Activities = {
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post('/activities', activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`)
}

export default {
    Activities
}