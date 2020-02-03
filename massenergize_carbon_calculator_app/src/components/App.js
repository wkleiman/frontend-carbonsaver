// Functional imports
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import history from '../history'
import '../style/App.css'
import Header from './header'
import { Routes } from './routes'
import { AuthProvider } from './context/AuthContext'
import { SelectedProvider } from './context/SelectedContext'
// TODO: May apply context for authentication redirecting for EventItem
const App = () => (
  <div>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <AuthProvider>
            <SelectedProvider>
              <Routes />
            </SelectedProvider>
          </AuthProvider>
        </Grid>
      </Grid>
    </BrowserRouter>
  </div>
)

export default App
