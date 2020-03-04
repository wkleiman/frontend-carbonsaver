import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import _ from 'lodash'
import { useFirebase } from 'react-redux-firebase'
import { AuthPage } from '../auth/AuthPage'
import { useAuthState } from '../context/AuthContext'
import { useSelectedState } from '../context/SelectedContext'
import { EventProvider } from '../context/EventContext'
import HomePage from '../pages/HomePage'
import EventList from '../pages/events/EventList'
import { fetchUser } from '../../actions'
import AboutPage from '../pages/about/AboutPage'
import ScoreBoardPage from '../pages/about/ScoreboardPage'
import SummaryPage from '../pages/about/SummaryPage'

export const Routes = withRouter(() => {
  const { selected } = useSelectedState()
  const { authState, setAuthState } = useAuthState()

  const firebase = useFirebase()
  const auth = firebase.auth()

  const getUser = async user => {
    const apiUser = await fetchUser(user)
    setAuthState(apiUser)
  }

  React.useEffect(() => {
    // Check if user is signed in
    const currentUser = _.get(auth, 'currentUser')
    if (!currentUser) {
      setAuthState(currentUser)
    } else {
      getUser(firebase.auth().currentUser)
    }
  }, [firebase.auth().currentUser])

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
