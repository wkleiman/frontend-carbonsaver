import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const SkipContext = createContext()

const SkipProvider = ({ children }) => {
  const [skipState, setSkipState] = useState([])
  return (
    <SkipContext.Provider value={{ skipState, setSkipState }}>
      {children}
    </SkipContext.Provider>
  )
}

function useSkipState() {
  const context = React.useContext(SkipContext)
  if (context === undefined) {
    throw new Error('useSkipState must be used within a SkipProvider')
  }
  return context
}

SkipProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { useSkipState, SkipProvider }
