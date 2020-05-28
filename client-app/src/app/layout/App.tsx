import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import '../layout/style.css';
import { IActivity } from '../models/activity';
import NavBar from '../../feature/Nav/NavBar';
import ActivityDashboard from '../../feature/Dashboard/ActivityDashboard';
import agent from '../api/agent';


const App = () => {

    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        agent.Activities.list()
            .then(response => {
                let activities: IActivity[] = [];
                response.forEach((activity: IActivity) => {
                    activity.date = activity.date.split(".")[0];
                    activities.push(activity);
                })
                setActivities(activities);
            })
    }, []);

    const handleSelectActivity = (id: string) => {
        agent.Activities.details(id).then(() => {
            setSelectedActivity(activities.filter(a => a.id === id)[0]);
            setEditMode(false);
        })
    }

    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    }

    const handleCreateActivity = (activity: IActivity) => {
        agent.Activities.create(activity).then(() => {

            setActivities([...activities, activity])
            setSelectedActivity(activity);
            setEditMode(false);

        })
    }

    const handleEditActivity = (activity: IActivity) => {
        agent.Activities.update(activity).then(() => {

            setActivities([...activities.filter(a => a.id !== activity.id), activity])
            setSelectedActivity(activity);
            setEditMode(false);

        })
    }

    const handleDeleteActivity = (id: string) => {
        agent.Activities.delete(id).then( () => {
            setActivities([...activities.filter(a => a.id !== id)]);
    })
    }

    return (
        <Fragment>
            <NavBar openCreateForm={handleOpenCreateForm} />
            <Container style={{ marginTop: '5em' }}>
                <ActivityDashboard activities={activities}
                    selectActivity={handleSelectActivity}
                    selectedActivity={selectedActivity!}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    setSelectedActivityNull={setSelectedActivity}
                    createActivity={handleCreateActivity}
                    editActivity={handleEditActivity}
                    deleteActivity={handleDeleteActivity}
                />
            </Container>
        </Fragment>
    );


}

export default App;