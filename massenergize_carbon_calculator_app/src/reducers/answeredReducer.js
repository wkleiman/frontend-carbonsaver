import { QUESTION_ANSWERED, SKIP, GET_SCORE } from '../actions/types';

export const answeredReducer = (state = {}, action) => {
    switch (action.type) {
        case QUESTION_ANSWERED: {
            return { ...state, [action.payload.actionName]: { ...state[action.payload.actionName], [action.payload.question]: action.payload.answer } };
        }
        case GET_SCORE:
            {
                return { ...state, [action.payload.actionType]: { ...state[action.payload.actionType], score: action.payload.response } };
            }
        default:
            return state;
    }
}

export const skipReducer = (state = {}, action) => {
    switch (action.type) {
        case SKIP:
            return { ...state, [action.payload.question]: { skipTags: action.payload.skipTags } };
        default: return state;
    }
}