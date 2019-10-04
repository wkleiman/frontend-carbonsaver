import { FETCH_EVENTS, FETCH_EVENT } from '../actions/types';
import _ from 'lodash';


export default (state = {}, action) => {

    switch (action.type) {
        case FETCH_EVENTS:
            return { ...state, ..._.mapKeys(action.payload.eventList, 'name') };
        case FETCH_EVENT:
            return { ...state, [action.payload.EventInfo.name]: action.payload.EventInfo };
        default: return state;
    }
}