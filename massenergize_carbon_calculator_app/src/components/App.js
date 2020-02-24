// Functional imports
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import '../style/App.css'
import { Routes } from './routes'
import { SelectedProvider } from './context/SelectedContext'
// TODO: May apply context for authentication redirecting for EventItem
const App = () => (
  <div>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <SelectedProvider>
        <Routes />
      </SelectedProvider>
    </BrowserRouter>
  </div>
)

export default App
