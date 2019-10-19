import actionReducer from './actionReducer';
import { answeredReducer, skipReducer } from './answeredReducer';
import eventsReducer from './eventsReducer';
import stationReducer from './stationReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    actions: actionReducer,
    answered: answeredReducer,
    events: eventsReducer,
    stationInfo: stationReducer,
    skip: skipReducer,
    auth: authReducer
})