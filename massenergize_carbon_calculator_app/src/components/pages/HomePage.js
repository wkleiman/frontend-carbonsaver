import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { EventProvider } from '../context/EventContext'
import Header from './header'
import EventItem from './events/EventItem'
import EventList from './events/EventList'
import AboutPage from './about/AboutPage'

const HomePage = withRouter(() => (
  <Grid container direction="row" justify="flex-start" alignItems="center">
    <Grid item xs={12}>
      <Header />
    </Grid>
    <Grid item xs={12}>
      <Switch>
        <Route
          path="/events"
          render={() => (
            <EventProvider>
              <EventList />
            </EventProvider>
          )}
        />
        <Route
          path="/event/:id"
          render={() => (
            <EventProvider>
              <EventItem />
            </EventProvider>
          )}
        />
        <Route path="/about" component={AboutPage} />
      </Switch>
    </Grid>
  </Grid>
))

export default HomePage
