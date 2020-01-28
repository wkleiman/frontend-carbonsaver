import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import EventList from '../pages/events/EventList'
import EventItem from '../pages/events/EventItem'
import { AuthPage } from '../auth/AuthPage'
import { SelectedProvider } from '../context/SelectedContext'
import { useAuthState } from '../context/AuthContext'

export const Routes = () => {
  const { authState, setAuthState } = useAuthState()
  const selected = useSelector(state => ({ ...state.event.selected }))
  console.log(authState)
  return (
    <Switch>
      <SelectedProvider>
        <Route path="/" exact component={EventList} />
      </SelectedProvider>

      {!authState ? (
        <Route path="/auth/signin" component={AuthPage} />
      ) : (
        <Redirect from="/auth" to={`/event/${selected.name}`} />
      )}
      {!authState ? (
        <Redirect to="/auth" />
      ) : (
        <Route path="/event/:id" exact component={EventItem} />
      )}
    </Switch>
  )
}
