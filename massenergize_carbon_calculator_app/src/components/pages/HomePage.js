import React from 'react'
import { Switch, Route } from 'react-router-dom'
import EventItem from './events/EventItem'

export const HomePage = props => (
  <Switch>
    <Route path="/event/:id" exact component={EventItem} />
  </Switch>
)
