import React from 'react';
import '../style/App.css';
import Header from './header';
import EventItem from './events/EventItem';
import SignUpPage from './auth/SignUpPage';
import LogInPage from './auth/logInPage';
import Grid from '@material-ui/core/Grid';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

class App extends React.Component {

  render() {
    return (
      <div>
        <Router history={history}>
          <React.Fragment>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item xs={12}><Header /></Grid>
              <Grid item xs={12} >
                <Switch>
                  <Route path="/event/:name" exact component={EventItem} />
                  <Route path="/login" exact component={LogInPage} />
                  <Route path="/signup" exact component={SignUpPage} />
                </Switch>
              </Grid>
            </Grid>
          </React.Fragment>
        </Router >
      </div >
    );
  }
}

export default App;
