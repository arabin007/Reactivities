import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { IActivity } from '../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';


interface detailParams {
    id: string;
}


const ActivityForm: React.FC<RouteComponentProps<detailParams>> = ({ match, history }) => {

    const activityStore = useContext(ActivityStore);
    const {
        createActivity,
        editActivity,
        submitting,
        activity: activityForFormInitialization,
        loadActivity,
        ClearActivity

    } = activityStore;

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        description: '',
        category: '',
        venue: '',
        city: '',
        date: ''
    });


    useEffect(() => {
        if (match.params.id && activity.id.length === 0) {
            loadActivity(match.params.id)
                .then(() => activityForFormInitialization && setActivity(activityForFormInitialization));
        }

        return () => {
            ClearActivity();
        }
    }, [loadActivity, ClearActivity, match.params.id, activityForFormInitialization, activity.id.length])

    //const handleInputChange = (event: any) => {   
    //    console.log(event.target);                
    //    const { name, value } = event.target;         //Only works for Input Type doesnt work for text area
    //    setActivity({ ...activity, [name]:value });
    //} 

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]:value });
    }

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        }
        else {
            editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <Form onSubmit={handleSubmit} >
                        <Form.Input onChange={handleInputChange} placeholder='Title' name='title' value={activity.title} />
                        <Form.TextArea onChange={handleInputChange} rows={2} placeholder='Description' name='description' value={activity.description} />
                        <Form.Input onChange={handleInputChange} placeholder='Category' name='category' value={activity.category} />
                        <Form.Input onChange={handleInputChange} type='datetime-local' placeholder='Date' name='date' value={activity.date} />
                        <Form.Input onChange={handleInputChange} placeholder='City' name='city' value={activity.city} />
                        <Form.Input onChange={handleInputChange} placeholder='Venue' name='venue' value={activity.venue} />
                        <Button loading={submitting} type="Submit" color="green" content="Save" />
                        <Button onClick={() => history.push('/activities')} basic content="Cancel" />
                    </Form>

                </Segment>
            </Grid.Column>
        </Grid>
       
    );
}

export default observer(ActivityForm);