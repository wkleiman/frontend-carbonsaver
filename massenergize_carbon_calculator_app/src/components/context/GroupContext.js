import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const GroupContext = createContext()

const GroupProvider = ({ children }) => {
  const [groupState, setGroupState] = useState()
  return (
    <GroupContext.Provider value={{ groupState, setGroupState }}>
      {children}
    </GroupContext.Provider>
  )
}

function useGroupState() {
  const context = React.useContext(GroupContext)
  if (context === undefined) {
    throw new Error('useGroupState must be used within a GroupProvider')
  }
  return context
}

GroupProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { useGroupState, GroupProvider }
