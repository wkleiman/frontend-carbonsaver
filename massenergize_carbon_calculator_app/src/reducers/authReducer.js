import { SIGN_IN } from '../actions/types'


export default (state, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignIn: action.payload.successful }
        default: return state;
    }
}