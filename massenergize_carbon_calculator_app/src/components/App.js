// Functional imports
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import '../style/App.css'
import { Grid } from '@material-ui/core'
import { Routes } from './routes'
import { SelectedProvider } from './context/SelectedContext'
import Header from './pages/header'
// TODO: May apply context for authentication redirecting for EventItem
const App = () => (
  <div>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <Grid item xs={12}>
          <Header />
        </Grid>
        <SelectedProvider>
          <Routes />
        </SelectedProvider>
      </Grid>
    </BrowserRouter>
  </div>
)

export default App
