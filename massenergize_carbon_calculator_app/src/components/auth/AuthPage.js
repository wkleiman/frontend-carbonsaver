import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './SignInPage'
import SignUp from './SignUpPage'
import ForgotPass from './ForgotPass'
import { GroupProvider } from '../context/GroupContext'

export const AuthPage = () => (
  <GroupProvider>
    <Switch>
      <Route path="/auth/signin" component={Login} />
      <Route path="/auth/signup" component={SignUp} />
      <Route path="/auth/resetpass" component={ForgotPass} />
      <Redirect from="/auth" exact to="/auth/signin" />
    </Switch>
  </GroupProvider>
)
