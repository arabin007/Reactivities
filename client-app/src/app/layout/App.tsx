import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import '../layout/style.css';
import axios from 'axios';
import { IActivity } from '../models/activity';
import NavBar from '../../feature/Nav/NavBar';
import ActivityDashboard from '../../feature/Dashboard/ActivityDashboard';


const App = () => {

    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios
            .get<IActivity[]>('http://localhost:5000/api/activities')
            .then(response => {
                let activities: IActivity[]= [];
                response.data.forEach(activity => {
                    activity.date = activity.date.split(".")[0];
                    activities.push(activity);
                })
                setActivities(activities);
            });
    }, []);

    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.filter(a => a.id === id)[0]);
        setEditMode(false);
    }

    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    }

    const handleCreateActivity = (activity: IActivity) => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
    }

    const handleEditActivity = (activity: IActivity) => {
        setActivities([...activities.filter(a => a.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
    }

    const handleDeleteActivity = (id: string) => {
        setActivities([...activities.filter(a => a.id !== id)]);
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