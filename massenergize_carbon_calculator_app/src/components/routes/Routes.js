import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { AuthPage } from '../auth/AuthPage'
import { useAuthState } from '../context/AuthContext'
import { useSelectedState } from '../context/SelectedContext'
import { EventProvider } from '../context/EventContext'
import HomePage from '../pages/HomePage'
import EventList from '../pages/events/EventList'
import AboutPage from '../pages/about/AboutPage'
import ScoreBoardPage from '../pages/about/ScoreboardPage'
import SummaryPage from '../pages/about/SummaryPage'

export const Routes = withRouter(() => {
  const { selected } = useSelectedState()
  const { authState } = useAuthState()

  return (
    <Switch>
      <Route path="/about" render={() => <AboutPage />} />
      <Route path="/summary" render={() => <SummaryPage />} />
      <Route path="/scoreboard" render={() => <ScoreBoardPage />} />
      <Route
        path="/events"
        render={() => (
          <EventProvider>
            <EventList />
          </EventProvider>
        )}
      />
      {!selected && <Redirect to="/events" />}
      {!authState && selected && <Route path="/auth" component={AuthPage} />}
      {authState && selected && (
        <Redirect from="/auth" to={`/event/${selected.name}`} />
      )}
      {!authState && selected && <Redirect to="/auth" />}
      {authState && selected && <HomePage />}
    </Switch>
  )
})
