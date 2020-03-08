import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { EventProvider } from '../context/EventContext'
import { AnsweredProvider } from '../context/AnsweredContext'
import { SkipProvider } from '../context/SkipContext'
import EventItem from './events/EventItem'
import { ScoreProvider } from '../context/ScoreContext'

const HomePage = withRouter(() => (
  <Grid item xs={12}>
    <Switch>
      <Route
        path="/event/:id"
        render={() => (
          <EventProvider>
            <AnsweredProvider>
              <SkipProvider>
                <ScoreProvider>
                  <EventItem />
                </ScoreProvider>
              </SkipProvider>
            </AnsweredProvider>
          </EventProvider>
        )}
      />
    </Switch>
  </Grid>
))

export default HomePage
