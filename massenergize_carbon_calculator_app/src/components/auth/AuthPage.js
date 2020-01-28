import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './SignInPage'
// import SignUp from './SignUpPage'
import ForgotPass from './ForgotPass'
import { AuthProvider } from '../context/AuthContext'
import { SelectedProvider } from '../context/SelectedContext'

export const AuthPage = () => (
  <Switch>
    <Redirect from="/auth" exact to="/auth/login" />
    <AuthProvider>
      <SelectedProvider>
        <Route path="/auth/login" component={Login} />
        {/* <Route path="/auth/signup" component={SignUp} /> */}
      </SelectedProvider>
    </AuthProvider>
    <Route path="/auth/forgotpass" component={ForgotPass} />
  </Switch>
)
