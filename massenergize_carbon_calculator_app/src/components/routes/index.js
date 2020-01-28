import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import EventItem from '../pages/events/EventItem'
import EventList from '../pages/events/EventList'
import ForgotPass from '../auth/ForgotPass'
import SignUpPage from '../auth/SignUpPage'
import SignInPage from '../auth/SignInPage'

export const Routes = () => (
  <Switch>
    <Route path="/" exact render={() => <Redirect to="/events" />} />
    <Route path="/events" exact component={EventList} />
    <Route path="/event/:name" exact component={EventItem} />
    <Route path="/signin" exact component={SignInPage} />
    <Route path="/signup" exact component={SignUpPage} />
    <Route path="/resetpass" exact component={ForgotPass} />
  </Switch>
)
