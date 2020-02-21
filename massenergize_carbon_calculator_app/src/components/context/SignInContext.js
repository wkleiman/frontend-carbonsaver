import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const SignInContext = createContext()

const SignInProvider = ({ children }) => {
  const [SignIn, setSignIn] = useState(true)
  return (
    <SignInContext.Provider value={{ SignIn, setSignIn }}>
      {children}
    </SignInContext.Provider>
  )
}

function useSignInState() {
  const context = React.useContext(SignInContext)
  if (context === undefined) {
    throw new Error('useSignInState must be used within a SignInProvider')
  }
  return context
}

SignInProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { useSignInState, SignInProvider }
