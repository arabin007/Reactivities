import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { IActivity } from '../../app/models/activity';


interface IProps {
    selectedActivity: IActivity ;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivityNull: (activity: null) => void;
}


const ActivityDetail: React.FC<IProps> = ({ selectedActivity, setEditMode, setSelectedActivityNull }) => {
    return (
        <Card fluid>            {/*Used Fluid so that Card takes all available width*/}
            <Image src={`/assets/categoryImages/${selectedActivity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{selectedActivity.title}</Card.Header>
                <Card.Meta>
                    <span >{selectedActivity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedActivity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}> {/*widths={2} means there are 2 buttons that sud occupy all space*/}
                    <Button onClick={() => setEditMode(true)} basic color='blue' content='Edit' />
                    <Button onClick={()=>setSelectedActivityNull(null)} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    );
}

export default ActivityDetail;