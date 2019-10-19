import { QUESTION_ANSWERED, SKIP } from '../actions/types';

export const answeredReducer = (state = {}, action) => {
    switch (action.type) {
        case QUESTION_ANSWERED: {
            console.log({ [action.payload.actionName]: { [action.payload.question]: action.payload.answer } });
            return { ...state, [action.payload.actionName]: { ...state[action.payload.actionName], [action.payload.question]: action.payload.answer } };
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