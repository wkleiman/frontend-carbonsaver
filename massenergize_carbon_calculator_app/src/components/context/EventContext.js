import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const EventContext = createContext()

const EventProvider = ({ children }) => {
  const [eventState, setEventState] = useState()
  return (
    <EventContext.Provider value={{ eventState, setEventState }}>
      {children}
    </EventContext.Provider>
  )
}

function useEventState() {
  const context = React.useContext(EventContext)
  if (context === undefined) {
    throw new Error('useEventState must be used within a EventProvider')
  }
  return context
}

EventProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { useEventState, EventProvider }
