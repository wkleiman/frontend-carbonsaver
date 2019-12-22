import * as types from "./types";
import api from "../api/massEnergize";
import history from "../history";

// fetchQuestions action
export const fetchQuestions = actionName => async dispatch => {
  const response = await api.get(`/cc/info/${actionName}`);

  dispatch({
    type: types.FETCH_ACTION_QUESTIONS,
    payload: response.data.questionInfo
  });
};
// getUser action to get the user
// TODO: May remove this action and just use userCreation action
export const getUser = user => async dispatch => {
  //const response = await api.get('/cc/info/user', {params: })
};
// Handle question answered to dispatch to application state
export const questionAnswered = (
  actionName,
  questionTag,
  answer,
  skip
) => dispatch => {
  dispatch({
    type: types.QUESTION_ANSWERED,
    payload: {
      actionName,
      questionTag,
      answer,
      skip
    }
  });
};
// Handle Sign out action
export const signOut = () => {
  return {
    type: types.SIGN_OUT
  };
};
// fetchEvents action, fetch all events for user selection
export const fetchEvents = () => async dispatch => {
  const response = await api.get("/cc/info/events");
  return dispatch({ type: types.FETCH_EVENTS, payload: response.data });
};
// fetchEvent action, fetch a single event
export const fetchEvent = id => async dispatch => {
  const response = await api.get(`/cc/info/event/${id}`);
  dispatch({ type: types.FETCH_EVENT, payload: response.data });
};
// Send query to backend to get points calculated
export const getScore = (userId, actionName, params) => async dispatch => {
  // No userId considered a get request
  if (!userId) {
    const response = await api.get(`/cc/estimate/${actionName}`, {
      params: { ...params }
    });
    dispatch({
      type: types.GET_SCORE,
      payload: { response: response.data, actionType: actionName }
    });
  } else {
    // POST request to save user answers to database
    // Get CSRF token before sending POST request
    const csrfResponse = await api.get(`/auth/csrf`);
    const { csrfToken } = csrfResponse.data.data;
    // Attach CSRF token to the headers and send request up to backend
    const response = await api.post(`/cc/estimate/${actionName}`, {
      ...params,
      user_id: userId,
      headers: { "X-CSRFToken": csrfToken }
    });
    dispatch({
      type: types.GET_SCORE,
      payload: { response: response.data, actionType: actionName }
    });
  }
};
// fetchGroups action, fetch all groups for user selection
export const fetchGroups = () => async dispatch => {
  const response = await api.get(`/cc/info/groups`);
  dispatch({ type: types.FETCH_GROUPS, payload: response.data.groupList });
};
// createUser action, send POST request to backend to save user registration info to database
export const createUser = (formValues, email, selected) => async dispatch => {
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
    email
  };
  // Get CSRF token
  const csrfResponse = await api.get(`/auth/csrf`);
  const { csrfToken } = csrfResponse.data.data;
  // Attach CSRF token to request's header and all information
  const response = await api.post(`/cc/users`, {
    ...params,
    headers: { "X-CSRFToken": csrfToken }
  });
  dispatch({ type: types.CREATE_USER, payload: response.data });
  history.push(`/event/${selected.name}`);
};
// Sign in action send GET request to backend with email to get the user
export const signIn = (user, selected) => async dispatch => {
  // Attach email to request and send off to backend to get user info
  console.log(selected);
  const response = await api.get("/cc/info/user", {
    params: {
      email: user.email
    }
  });
  dispatch({
    type: types.SIGN_IN,
    payload: response.data.userInfo
  });
  history.push(`/event/${selected.name}`);
};
