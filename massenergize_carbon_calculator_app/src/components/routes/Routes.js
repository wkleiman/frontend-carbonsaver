import React from 'react'
import PropType from 'prop-types'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import _ from 'lodash'
import EventList from '../pages/events/EventList'
import EventItem from '../pages/events/EventItem'
import { AuthPage } from '../auth/AuthPage'
import { useSelectedState } from '../context/SelectedContext'
import { useSignInState } from '../context/SignInContext'
import { useAuthState } from '../context/AuthContext'
import HomePage from '../pages/HomePage'

export const Routes = withRouter(props => {
  const { authState } = useAuthState()
  const { selected } = useSelectedState()
  const { SignIn } = useSignInState()

  const AuthRoute = !SignIn ? (
    <Route path="/auth/signup" />
  ) : (
    <Route path="/auth/signin" />
  )
  const AuthRedirect = !SignIn ? (
    <Redirect to="/auth/signup" />
  ) : (
    <Redirect to="/auth/signin" />
  )

  return (
    <Switch>
      <Route path="/events" component={EventList} />
      <Route path="/auth" component={AuthPage} />
      {!selected && <Redirect to="/events" />}
      {!authState ? (
        AuthRoute
      ) : (
        <Redirect from="/auth" to={`/event/${selected.name}`} />
      )}
      {!authState ? AuthRedirect : <HomePage />}
    </Switch>
  )
})
