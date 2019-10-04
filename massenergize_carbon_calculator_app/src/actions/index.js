import * as types from './types';
import api from '../api/massEnergize';

// export const signIn = () => async dispatch => {
//     const response = await api.get(`auth/login`);

//     dispatch({ type: SIGN_IN, payload: response.data });
// }
export const questionAnswered = (questionTag, answer) => {
    return {
        type: types.QUESTION_ANSWERED,
        payload: {
            question: questionTag,
            answer,
            isAnswered: true,
        }
    };
}

export const fetchActionInfo = (name) => async dispatch => {
    const response = await api.get(`/cc/info/action/${name}`);
    dispatch({ type: types.FETCH_ACTION_INFO, payload: response.data })
}

export const fetchEvents = () => async dispatch => {
    const response = await api.get("/cc/info/events");
    dispatch({ type: types.FETCH_EVENTS, payload: response.data })
}

export const fetchEvent = id => async dispatch => {
    const response = await api.get(`/cc/info/event/${id}`);
    dispatch({ type: types.FETCH_EVENT, payload: response.data });
}

export const fetchStation = name => async dispatch => {
    const response = await api.get(`cc/info/station/${name}`);
    dispatch({ type: types.FETCH_STATION, payload: response.data });
}