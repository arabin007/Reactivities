﻿import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfilePhotos from './ProfilePhotos';
import ProfileFollowings from './ProfileFollowings';
import ProfileActivities from './ProfileActivities';

const panes = [
    { menuItem: 'About', render: () => <Tab.Pane>About</Tab.Pane> },
    { menuItem: 'Photos', render: () => <ProfilePhotos /> },
    { menuItem: 'Activities', render: () => <ProfileActivities /> },
    { menuItem: 'Followers', render: () => <ProfileFollowings /> },
    { menuItem: 'Followerings', render: () => <ProfileFollowings /> }
]

interface IProps {
    setActiveTab: (activeIndex: any) => void
}

const ProfileContent: React.FC<IProps> = ({ setActiveTab }) => {
    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}
            onTabChange={(e, data) => setActiveTab(data.activeIndex)} 
            //activeIndex={1}
        />
    )
};

export default ProfileContent;
