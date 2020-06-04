﻿import React, { useContext, Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
import ActivityStore from '../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem';


const ActivityList: React.FC = () => {

    const activityStore = useContext(ActivityStore);
    const { activitiesByDate } = activityStore;

    return (
        <Fragment>
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Label size='large' color='blue'>
                        {group}
                    </Label>
                    {/* <Segment clearing>   clearing clears floats (if any) from its parent*/}
                        <Item.Group divided>             {/*divided gives Nice Horizontal lines between the Items*/}
                            {activities.map(activity => (
                                <ActivityListItem key={activity.id} activity={activity} />
                            ))}
                        </Item.Group>
                    {/* </Segment> */}
                </Fragment>
                ))}
        </Fragment>

    );
}

export default observer(ActivityList);