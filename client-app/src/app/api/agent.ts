import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';
import { history } from '../..';
import { toast } from 'react-toastify';

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(undefined, error => {
    console.log(error);
    const { status, data, config } = error.response;
    if (error.message === 'Network Error' && !error.response) {
        toast.error('API is not Responding');
    }
    if (status === 404) {
        history.push('/notfound');
    }
    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/notfound');
    }
    if (status === 500) {
        toast.error('Server Error - check the terminal for more info!');
    }
});

const responseBody = (response: AxiosResponse) => { return response.data }

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));     //For Artificial delay


const requests = {
    get: (url: string) => { return axios.get(url).then(sleep(1000)).then(responseBody); },
    //get: (url: string) => { return axios.get(url).then(responseBody); }, //Without delay
    post: (url: string, body: {}) => { return axios.post(url, body).then(sleep(1000)).then(responseBody); },
    put: (url: string, body: {}) => { return axios.put(url, body).then(sleep(1000)).then(responseBody); },
    del: (url: string) => { return axios.delete(url).then(sleep(1000)).then(responseBody); }
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