import { SIGN_IN, SIGN_OUT } from '../actions/types'

const INITIAL_STATE = {
    isSignedIn: false,
    userID: null,
    method: null,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userID: action.payload.userId };
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userID: null };
        default: return state;
    }
}