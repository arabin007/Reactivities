﻿import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import {  ActivityFormValues } from '../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../app/common/Form/TextInput';
import TextAreaInput from '../../app/common/Form/TextAreaInput';
import SelectInput from '../../app/common/Form/SelectInput';
import { category } from '../../app/common/options/categoryOptions';
import DateInput from '../../app/common/Form/DateInput';
import { combineDateAndTime } from '../../app/common/util/util';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';

const validate = combineValidators({
    title: isRequired({ message: " The Event Title cannot be empty." }),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({ message: "Description must be atleast 5 characters" }),
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
})

interface detailParams {
    id: string;
}


const ActivityForm: React.FC<RouteComponentProps<detailParams>> = ({ match, history }) => {

    const activityStore = useContext(ActivityStore);
    const {
        createActivity,
        editActivity,
        submitting,
        loadActivity
    } = activityStore;

    const [activity, setActivity] = useState(new ActivityFormValues());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            loadActivity(match.params.id).then(
                (activity) => setActivity(new ActivityFormValues(activity))
            ).finally(() => setLoading(false));
        }

    }, [loadActivity, match.params.id])

 
    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const { date, time, ...activity } = values;
        activity.date = dateAndTime;
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        }
        else {
            editActivity(activity);
        }
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        initialValues={activity}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form onSubmit={handleSubmit} loading={loading} >
                                <Field component={TextInput} placeholder='Title' name='title' value={activity.title} />
                                <Field component={TextAreaInput} rows={2} placeholder='Description' name='description' value={activity.description} />
                                <Field component={SelectInput} options={category} placeholder='Category' name='category' value={activity.category} />

                                <Form.Group widths="equal">
                                    <Field component={DateInput} placeholder='Date' name='date' date={true} value={activity.date} />
                                    <Field component={DateInput} placeholder='Time' name='time' time={true} value={activity.time} />
                                </Form.Group>

                                <Field component={TextInput} placeholder='City' name='city' value={activity.city} />
                                <Field component={TextInput} placeholder='Venue' name='venue' value={activity.venue} />
                                <Button loading={submitting} disabled={loading || invalid || pristine} type="Submit" color="green" content="Save" />
                                <Button onClick={activity.id ? () => history.push(`/activities/${activity.id}`) : () => history.push('/activities')} disabled={loading} basic content="Cancel" />
                            </Form>
                        )}
                    />


                </Segment>
            </Grid.Column>
        </Grid>

    );
}

export default observer(ActivityForm);