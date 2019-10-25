import { answeredReducer, skipReducer } from './answeredReducer';
import eventsReducer from './eventsReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    answered: answeredReducer,
    events: eventsReducer,
    skip: skipReducer,
    auth: authReducer
})