import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const ScoreContext = createContext()

const ScoreProvider = ({ children }) => {
  const [scoreState, setScoreState] = useState()
  return (
    <ScoreContext.Provider value={{ scoreState, setScoreState }}>
      {children}
    </ScoreContext.Provider>
  )
}

function useScoreState() {
  const context = React.useContext(ScoreContext)
  if (context === undefined) {
    throw new Error('useScoreState must be used within a ScoreProvider')
  }
  return context
}

ScoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { useScoreState, ScoreProvider }
