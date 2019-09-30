import * as types from './types';
import api from '../api/questions';

// export const signIn = () => async dispatch => {
//     const response = await api.get(`auth/login`);

//     dispatch({ type: SIGN_IN, payload: response.data });
// }
export const questionAnswered = (questionTag, answer) => {
    return {
        type: types.QUESTION_ANSWERED,
        payload: {
            question: questionTag,
            answer
        }
    };
}
export const fetchActions = () => async dispatch => {
    const response = await api.get("/cc/");
    dispatch({ type: types.FETCH_ACTIONS, payload: response.data });
}

export const fetchActionInfo = (name) => async dispatch => {
    const response = await api.get(`/cc/info/${name}`);
    dispatch({ type: types.FETCH_ACTION_INFO, payload: response.data })
}