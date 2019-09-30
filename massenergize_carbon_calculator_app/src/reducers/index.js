import actionReducer from './actionReducer';
import answeredReducer from './answeredReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    actions: actionReducer,
    answered: answeredReducer
})