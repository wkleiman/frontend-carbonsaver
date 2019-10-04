import * as types from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_STATION:
            return { ...state, [action.payload.StationInfo.name]: action.payload.StationInfo }
        default: return state;
    }
}