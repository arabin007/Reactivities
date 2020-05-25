import React from 'react';
import { IActivity } from '../../app/models/activity';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetail from '../Details/ActivityDetails';
import ActivityForm from '../Form/ActivityForm';

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivityNull: (activity: null) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (id: string) => void;
}

const ActivityDashboard: React.FC<IProps> = ({ activities, selectActivity, selectedActivity, editMode, setEditMode, setSelectedActivityNull, createActivity, editActivity, deleteActivity }) => {
    return (
        <Grid>
            <Grid.Column width={10}>

                <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={ deleteActivity } />
             
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && <ActivityDetail
                    selectedActivity={selectedActivity}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    setSelectedActivityNull={setSelectedActivityNull}
                />}
                {editMode && <ActivityForm
                    key={selectedActivity && selectedActivity.id || 0 }
                    editMode={editMode}
                    setEditMode={setEditMode}
                    activityForFormInitialization={selectedActivity}
                    createActivity={createActivity}
                    editActivity={editActivity}
                />}
            </Grid.Column>

        </Grid>
    );
}

export default ActivityDashboard;