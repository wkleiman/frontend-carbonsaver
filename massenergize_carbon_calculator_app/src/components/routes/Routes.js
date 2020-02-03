import React from 'react'
import PropType from 'prop-types'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import _ from 'lodash'
import EventList from '../pages/events/EventList'
import EventItem from '../pages/events/EventItem'
import { AuthPage } from '../auth/AuthPage'
import { SelectedProvider, useSelectedState } from '../context/SelectedContext'
import { useAuthState, AuthProvider } from '../context/AuthContext'
import HomePage from '../pages/HomePage'

export const Routes = withRouter(props => {
  const { authState, setAuthState } = useAuthState()
  const { selected, setSelected } = useSelectedState()
  return (
    <Switch>
      <Route path="/events" exact component={EventList} />
      {!selected && <Redirect to="/events" />}
      {!authState ? (
        <Route path="/auth/signin" exact component={AuthPage} />
      ) : (
        <Redirect from="/auth" to={`/event/${selected.name}`} />
      )}
      {!authState ? <Redirect to="/auth/signin" /> : <HomePage />}
    </Switch>
  )
})
