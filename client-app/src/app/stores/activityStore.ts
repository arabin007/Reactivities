import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';


configure({ enforceActions: "always" }) // Although Mobx can change the otherwise immutable fileds ie observables. It is recommended that it is done inside an action. Since we are using async keyword and we are awaiting something to happen, changes made after await keyword is not covered by the action decorator. Hence we should add another action as 'runInAction' before making change to these obeserables.

class ActivityStore {
    @observable activitiesRepository = new Map();
    //@observable activities: IActivity[] = [];
    @observable activity: IActivity | null = null;    //To show detail
    @observable loadingInitial = false; //For loading spinner while listing activities
    @observable submitting = false;     //For loading spinner while button click of submit and delete
    @observable target = "";            //For loading spinner for targeting specific delete

    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activitiesRepository.values()))
    };

    groupActivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities.sort(
            (a, b) => a.date.getTime() - b.date.getTime()
        );
        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date.toISOString().split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {} as { [key: string]: IActivity[] }))
    }

    //@action loadActivities = () => {
    //    agent.Activities.list()
    //        .then(activityList => {
    //            activityList.forEach(activity => {
    //                activity.date = activity.date.split('.')[0]   //For date issue.
    //                this.activities.push(activity)
    //            })
    //        })
    //};

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activityList = await agent.Activities.list();

            runInAction('loading activities', () => {       //The first parameter string is solely for debugging purposes only in mobx.
                activityList.forEach(activity => {
                    activity.date = new Date(activity.date)
                    //this.activities.push(activity)
                    this.activitiesRepository.set(activity.id, activity)  //Populating activityRepository with individual activity (at a time) obtained from api 
                    this.loadingInitial = false;
                });
            })

        } catch (error) {

            runInAction('loading activities error', () => {
                this.loadingInitial = false;
            })
            console.log(error);
        }
    };

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            //this.activities.push(activity);
            runInAction('creating activites', () => {
                this.activitiesRepository.set(activity.id, activity);
                this.submitting = false;
            });
            history.push(`/activities/${activity.id}`)

        } catch (error) {
            runInAction('creating activites error', () => {
                this.submitting = false;
            });
            toast.error("Problem Submitting data.");
            console.log(error);
        }
    };

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction('editing activity', () => {
                this.activitiesRepository.set(activity.id, activity);
                this.activity = activity;
                this.submitting = false;
            })
            history.push(`/activities/${activity.id}`)

        } catch (error) {
            runInAction('editing activity error', () => {
                this.submitting = false;
            });
            toast.error("Problem Submitting data.");
            console.log(error);
        }
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction('deleting activity', () => {
                this.activitiesRepository.delete(id);
                this.submitting = false;
                this.target = "";
            })

        } catch (error) {
            runInAction('deleting activity error', () => {
                this.submitting = false;
                this.target = "";
            })
            console.log(error);
        }

    }

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.activity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction('getting activity', () => {
                    activity.date = new Date(activity.date)
                    this.activity = activity;
                    this.activitiesRepository.set(activity.id, activity);
                    this.loadingInitial = false;
                });
                return activity;
            } catch (error) {
                runInAction('getting activity', () => {
                    this.loadingInitial = false;
                });
                console.log(error);
            }
        }
    }

    getActivity = (id: string) => {                 //Checking if activity exists for loadActivity exclusively
        return this.activitiesRepository.get(id);   //Returns undefined if no activity is found
    }

    @action ClearActivity = () => {
        this.activity = null;
    }

}

export default createContext(new ActivityStore())