import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import '../layout/style.css';
import NavBar from '../../feature/Nav/NavBar';
import ActivityDashboard from '../../feature/Dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite'
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import Homepage from '../../feature/Home/Homepage';
import ActivityForm from '../../feature/Form/ActivityForm';
import ActivityDetails from '../../feature/Details/ActivityDetails';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';

const App: React.FC<RouteComponentProps> = ({ location }) => {

    return (
        <Fragment>
            <ToastContainer position='bottom-right' />
            <Route exact path="/" component={Homepage} />
            <Route path={'/(.+)'}
                render={() => (
                    <Fragment>
                        <NavBar />
                        <Container style={{ marginTop: '7em' }}>
                            <Switch>                      {/*Loads only one Route at a given time*/}
                                <Route exact path="/activities" component={ActivityDashboard} />
                                <Route path="/activities/:id" component={ActivityDetails} />
                                <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
                                <Route component={NotFound} />
                            </Switch>
                        </Container>
                    </Fragment>
                )}
            />

        </Fragment>
    );


}

export default withRouter(observer(App));   // Making the App component observer so it can look at the changes in activityStore and make changes accordingly.