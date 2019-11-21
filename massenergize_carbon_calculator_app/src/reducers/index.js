import { answeredReducer } from './answeredReducer';
import eventsReducer from './eventsReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'
import { reducer as formReducer } from 'redux-form';
import groupReducer from './groupReducer';

export default combineReducers({
    firebase: firebaseReducer,
    answered: answeredReducer,
    event: eventsReducer,
    auth: authReducer,
    form: formReducer,
    groups: groupReducer,
})