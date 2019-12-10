import * as types from './types';
import api from '../api/massEnergize';
import history from '../history';

export const fetchQuestions = (actionName) => async dispatch => {
    const response = await api.get(`/cc/info/${actionName}`);

    dispatch({ type: types.FETCH_ACTION_QUESTIONS, payload: response.data.questionInfo })
}

export const getUser = (user) => async dispatch => {
    console.log(user);
    // const response = await api.get('/cc/info/user', {params: })
}

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

export const fetchEvents = () => async (dispatch) => {
    const response = await api.get("/cc/info/events");
    return dispatch({ type: types.FETCH_EVENTS, payload: response.data });
}

export const fetchEvent = id => async dispatch => {
    const response = await api.get(`/cc/info/event/${id}`);
    dispatch({ type: types.FETCH_EVENT, payload: response.data });
}

export const getScore = (userId, actionName, params) => async dispatch => {
    if (!userId) {
        const response = await api.get(`/cc/estimate/${actionName}`, { params: { ...params } });
        dispatch({ type: types.GET_SCORE, payload: { response: response.data, actionType: actionName } });
    } else {
        const csrfResponse = await api.get(`/auth/csrf`);
        const { csrfToken } = csrfResponse.data.data;
        const response = await api.post(`/cc/estimate/${actionName}`, { ...params, user_id: userId, headers: { "X-CSRFToken": csrfToken } })
        dispatch({ type: types.GET_SCORE, payload: { response: response.data, actionType: actionName } });
    }
}

export const fetchGroups = () => async dispatch => {
    const response = await api.get(`/cc/info/groups`);
    dispatch({ type: types.FETCH_GROUPS, payload: response.data.groupList });
}

export const createUser = (formValues, email) => async dispatch => {
    /*params :  
    first_name, 
    last_name, 
    email, 
    locality, 
    groups, 
    minimum_age,
    accepts_terms_and_conditions*/
    const { groups, ...otherValues } = formValues;
    const params = {
        ...otherValues,
        groups: [groups],
        email,
    }
    const csrfResponse = await api.get(`/auth/csrf`);
    const { csrfToken } = csrfResponse.data.data;
    const response = await api.post(`/cc/users`, { ...params, headers: { "X-CSRFToken": csrfToken } })
    dispatch({ type: types.CREATE_USER, payload: response.data })
}


export const signIn = (user) => async dispatch => {

    const response = await api.get('/cc/info/user', {
        params: {
            email: user.email,
        }
    });
    dispatch({
        type: types.SIGN_IN,
        payload: response.data.userInfo
    })
}