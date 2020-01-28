// Functional imports
import React from 'react'
import { Router } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import history from '../history'
import '../style/App.css'
import Header from './header'
import { Routes } from './routes'
import { AuthProvider } from './context/AuthContext'
// TODO: May apply context for authentication redirecting for EventItem
const App = () => (
  <div>
    <Router history={history}>
      <>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </Grid>
        </Grid>
      </>
    </Router>
  </div>
)

export default App
