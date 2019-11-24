import * as types from './types';
import api from '../api/massEnergize';
import history from '../history';

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

export const createUser = async (formValues, email) => {
    /*params :  
    first_name, 
    last_name, 
    email, 
    locality, 
    groups, 
    minimum_age,
    accepts_terms_and_conditions*/

    const params = {
        ...formValues,
        email,
    }
    const csrfResponse = await api.get(`/auth/csrf`);
    const { csrfToken } = csrfResponse.data.data;
    const response = await api.post(`/cc/users`, { ...params, headers: { "X-CSRFToken": csrfToken } })
    history.push('/signin')
}


export const signIn = (user) => {
    return {
        type: types.SIGN_IN,
        payload: { userId: user.uid, }
    }
}