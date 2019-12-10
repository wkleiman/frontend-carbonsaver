import { SIGN_IN, SIGN_OUT, CREATE_USER } from '../actions/types'

const INITIAL_STATE = {
    isSignedIn: false,
    userID: null,
    method: null,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_USER:
            return { ...state }
        case SIGN_IN:
            {
                return { ...state, isSignedIn: true, userID: action.payload.id, user: action.payload };
            }
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userID: null };
        default: return state;
    }
}