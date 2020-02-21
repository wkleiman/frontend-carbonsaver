import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const selectedContext = createContext()

const SelectedProvider = ({ children }) => {
  const [selected, setSelected] = useState()
  return (
    <selectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </selectedContext.Provider>
  )
}

function useSelectedState() {
  const context = React.useContext(selectedContext)
  if (context === undefined) {
    throw new Error('useSelectedState must be used within a SelectedProvider')
  }
  return context
}

SelectedProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { useSelectedState, SelectedProvider }
