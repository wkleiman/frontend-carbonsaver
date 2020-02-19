import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Login from './SignInPage'
import SignUp from './SignUpPage'
import ForgotPass from './ForgotPass'

export const AuthPage = () => (
  <Switch>
    <Redirect from="/auth" exact to="/auth/signin" />
    <Route path="/auth/signin" component={Login} />
    <Route path="/auth/signup" component={SignUp} />
    <Route path="/auth/forgotpass" component={ForgotPass} />
  </Switch>
)
