import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './SignInPage'
import SignUp from './SignUpPage'
import ForgotPass from './ForgotPass'

const AuthPage = () => (
  <Switch>
    <Redirect from="/auth" exact to="/auth/login" />
    <Route path="/auth/login" component={Login} />
    <Route path="/auth/signup" component={SignUp} />
    <Route path="/auth/forgotpass" component={ForgotPass} />
  </Switch>
)

export default AuthPage
