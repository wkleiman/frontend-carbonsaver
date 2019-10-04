import React from 'react';
import '../style/App.css';
import Header from './header';
import EventList from './events/EventList';
import EventItem from './events/EventItem';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div>
          <Grid container style={{ padding: 10 }}>
            <CssBaseline />
            <Grid item xs={12}><Header /></Grid>
            <Switch>
              <Route path="/" exact component={EventList} />
              <Route path="/event/:name" exact component={EventItem} />
            </Switch>
            {/* <Grid item xs={3}><Auth /></Grid> */}
          </Grid>
        </div>
      </Router>
    </div>
  );
}

export default App;
