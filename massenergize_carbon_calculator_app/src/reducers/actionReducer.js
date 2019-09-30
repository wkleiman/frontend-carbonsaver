import * as types from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_ACTIONS:
            return { ...state, ..._.mapKeys(action.payload.actions, 'name') };
        case types.FETCH_ACTION_INFO:
            return { ...state, [action.payload.name]: action.payload };
        default: return state;
    }
}
