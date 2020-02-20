import React from 'react'
import { Switch, Route } from 'react-router-dom'
import EventItem from './events/EventItem'
import AboutPage from './about/AboutPage'

const HomePage = props => (
  <Switch>
    <Route path="/event/:id" component={EventItem} />
    <Route path="/about" component={AboutPage} />
  </Switch>
)

export default HomePage
