import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState()
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuthState() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider')
  }
  return context
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { useAuthState, AuthProvider }
