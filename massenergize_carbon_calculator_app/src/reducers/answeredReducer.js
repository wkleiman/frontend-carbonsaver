import { QUESTION_ANSWERED } from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case QUESTION_ANSWERED:
            return { ...state, [action.payload.question]: action.payload };
        default:
            return state;
    }
}