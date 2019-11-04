import { FETCH_EVENT } from '../actions/types';


export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_EVENT:
            return { ...state, [action.payload.eventInfo.name]: action.payload.eventInfo };
        default: return state;
    }
}