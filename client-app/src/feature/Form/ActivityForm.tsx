import React, { useState, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../app/models/activity';
import { v4 as uuid } from 'uuid';


interface IProps {
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    activityForFormInitialization: IActivity | null;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
}


const ActivityForm: React.FC<IProps> = ({ setEditMode, activityForFormInitialization, createActivity, editActivity }) => {

    const initializeForm = () => {
        if (activityForFormInitialization)
            return activityForFormInitialization;
        else {
            return {
                id: '',
                title: '',
                description: '',
                category: '',
                venue: '',
                city: '',
                date: ''
            };
        }
    }

    const [activity, setActivity] = useState<IActivity>(initializeForm);

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
            createActivity(newActivity);
        }
        else {
            editActivity(activity)
        }
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} >
                <Form.Input onChange={handleInputChange} placeholder='Title' name='title' value={activity.title} />
                <Form.TextArea onChange={handleInputChange} rows={2} placeholder='Description' name='description' value={activity.description} />
                <Form.Input onChange={handleInputChange} placeholder='Category' name='category' value={activity.category} />
                <Form.Input onChange={handleInputChange} type='datetime-local' placeholder='Date' name='date' value={activity.date} />
                <Form.Input onChange={handleInputChange} placeholder='City' name='city' value={activity.city} />
                <Form.Input onChange={handleInputChange} placeholder='Venue' name='venue' value={activity.venue} />
                <Button type="Submit" color="green" content="Save" />
                <Button onClick={() => setEditMode(false)} basic content="Cancel" /> 
            </Form>
           
        </Segment>
    );
}

export default ActivityForm;