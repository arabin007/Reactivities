import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import '../layout/style.css';
import NavBar from '../../feature/Nav/NavBar';
import ActivityDashboard from '../../feature/Dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite'
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import Homepage from '../../feature/Home/Homepage';
import ActivityForm from '../../feature/Form/ActivityForm';
import ActivityDetails from '../../feature/Details/ActivityDetails';

const App: React.FC<RouteComponentProps> = ({ location }) => {

    return (
        <Fragment>
            <Route exact path="/" component={Homepage} />
            <Route path={'/(.+)'}
                render={() => (
                    <Fragment>
                        <NavBar />
                        <Container style={{ marginTop: '5em' }}>
                            <Route exact path="/activities" component={ActivityDashboard} />
                            <Route path="/activities/:id" component={ActivityDetails} />
                            <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
                        </Container>
                    </Fragment>
                )}
            />

        </Fragment>
    );


}

export default withRouter(observer(App));   // Making the App component observer so it can look at the changes in activityStore and make changes accordingly.