import * as types from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_ACTION_INFO:
            return { ...state, [action.payload.name]: action.payload };
        case types.GET_SCORE:
            {
                return { ...state, [action.payload.actionType]: { ...state[action.payload.actionType], score: action.payload.response } };
            }
        default: return state;
    }
}
