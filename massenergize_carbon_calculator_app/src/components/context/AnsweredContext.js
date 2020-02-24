import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const AnsweredContext = createContext()

const AnsweredProvider = ({ children }) => {
  const [answeredState, setAnsweredState] = useState()
  return (
    <AnsweredContext.Provider value={{ answeredState, setAnsweredState }}>
      {children}
    </AnsweredContext.Provider>
  )
}

function useAnsweredState() {
  const context = React.useContext(AnsweredContext)
  if (context === undefined) {
    throw new Error('useAnsweredState must be used within a AnsweredProvider')
  }
  return context
}

AnsweredProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { useAnsweredState, AnsweredProvider }
