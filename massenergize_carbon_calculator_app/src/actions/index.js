import * as types from './types';
import api from '../api/massEnergize';

// export const signIn = () => async dispatch => {
//     const response = await api.get(`auth/login`);

//     dispatch({ type: SIGN_IN, payload: response.data });
// }
export const questionAnswered = (actionName, questionTag, answer, skip) => dispatch => {
    dispatch({
        type: types.QUESTION_ANSWERED,
        payload: {
            actionName,
            questionTag,
            answer,
            skip
        }
    });
}

export const signOut = () => {
    return {
        type: types.SIGN_OUT
    };
};

export const fetchEvents = () => async dispatch => {
    const response = await api.get("/cc/info/events");
    dispatch({ type: types.FETCH_EVENTS, payload: response.data })
}

export const fetchEvent = id => async dispatch => {
    const response = await api.get(`/cc/info/event/${id}`);
    dispatch({ type: types.FETCH_EVENT, payload: response.data });
}

export const getScore = (actionName, params) => async dispatch => {
    const response = await api.get(`/cc/estimate/${actionName}`, { params: { ...params } });
    dispatch({ type: types.GET_SCORE, payload: { response: response.data, actionType: actionName } });
}


export const signIn = (email) => async dispatch => {
    const response = await api.get(`/v2/e/${email}`);
    dispatch({ type: types.SIGN_IN, payload: response.data });
}