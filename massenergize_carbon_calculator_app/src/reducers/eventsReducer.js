import _ from 'lodash'
import { FETCH_EVENT, FETCH_EVENTS, SELECTED_EVENT } from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case SELECTED_EVENT:
      return { ...state, selected: action.payload }
    case FETCH_EVENTS:
      return { ...state, ..._.mapKeys(action.payload.eventList, 'name') }
    case FETCH_EVENT:
      return {
        ...state,
        [action.payload.eventInfo.name]: action.payload.eventInfo,
      }
    default:
      return state
  }
}
