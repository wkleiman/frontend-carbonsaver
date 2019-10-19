import * as types from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_STATIONS:
            return { ...state, ..._.mapKeys(action.payload.stationList, 'name') };
        case types.FETCH_STATION:
            return { ...state, [action.payload.StationInfo.name]: action.payload.StationInfo };
        default: return state;
    }
}