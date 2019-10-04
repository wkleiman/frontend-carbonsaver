import actionReducer from './actionReducer';
import answeredReducer from './answeredReducer';
import eventsReducer from './eventsReducer';
import stationReducer from './stationReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    actions: actionReducer,
    answered: answeredReducer,
    events: eventsReducer,
    stationInfo: stationReducer,
})