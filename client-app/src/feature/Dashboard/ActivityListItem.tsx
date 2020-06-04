import React from 'react';
import { Item, Button, Label, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
//import ActivityStore from '../../app/stores/activityStore';
import { IActivity } from '../../app/models/activity';

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as='a'> {activity.title} </Item.Header>
                            <Item.Description>
                                Hosted By
                        </Item.Description>
                            <Item.Extra>
                                 <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock' /> {activity.date}
                <Icon name='marker' />  {activity.venue},{activity.city}
            </Segment>
            <Segment secondary>
                Attendees
            </Segment>
            <Segment clearing>
                <span> {activity.description} </span>
                <Button floated='right' content='view' color='blue'
                    as={Link} to={`/activities/${activity.id}`} />      {/* When view button is clicked, it invokes selectActivity action inside activityStore( which is a change in the state but it doesnt bother ActivityDetails). This method causes change in 'selectedActivity observable' which is being observed by ActivityDetails file as (selectedActivity: activity). Here activity is the current instance of selected activity in activityStore. Now this change is observed by ActivityDetails and causes rerender of the Component */}

            </Segment>

        </Segment.Group>
    );
}

export default ActivityListItem;