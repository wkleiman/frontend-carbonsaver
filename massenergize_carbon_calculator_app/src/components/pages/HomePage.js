import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import EventItem from './events/EventItem'

export default function HomePage(props) {
  return (
    <Switch>
      <Route path="/event/:id" exact component={EventItem} />
    </Switch>
  )
}
