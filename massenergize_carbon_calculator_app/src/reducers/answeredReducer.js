import { QUESTION_ANSWERED, GET_SCORE } from '../actions/types';

export const answeredReducer = (state = { skip: {} }, action) => {
    switch (action.type) {
        case QUESTION_ANSWERED:
            return {
                ...state,
                [action.payload.actionName]: { ...state[action.payload.actionName], [action.payload.questionTag]: action.payload.answer },
                skip: { ...state.skip, [action.payload.questionTag]: action.payload.skip }
            }
        case GET_SCORE:
            return { ...state, [action.payload.actionType]: { ...state[action.payload.actionType], score: action.payload.response } };
        default:
            return state;
    }
}
