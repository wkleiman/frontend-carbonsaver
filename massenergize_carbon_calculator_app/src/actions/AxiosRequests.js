import _ from 'lodash'
import * as types from './types'
import api from '../api/massEnergize'

// fetchQuestions action
export const fetchQuestions = actionName => async dispatch => {
  const response = await api.get(`/cc/info/${actionName}`)

  dispatch({
    type: types.FETCH_ACTION_QUESTIONS,
    payload: response.data.questionInfo,
  })
}
// getUser action to get the user
// TODO: May remove this action and just use userCreation action
export const fetchUser = async user => {
  // Attach email to request and send off to backend to get user info
  const response = await api.get('/cc/info/user', {
    params: {
      email: user.email,
    },
  })
  return _.get(response, 'data.userInfo')
}
// Handle Sign out action
export const signOut = () => ({
  type: types.SIGN_OUT,
})
// fetchEvents action, fetch all events for user selection
export const fetchEvents = async () => {
  const response = await api.get('/cc/info/events')
  return response.data.eventList
}
// fetchEvent action, fetch a single event
export const fetchEvent = async id => {
  const response = await api.get(`/cc/info/event/${id}`)
  return response.data
}

// Send query to backend to calculate points and post score
export const getScore = async ({ actionName, ...params }) => {
  // No userId considered a get request
  const response = await api.get(`/cc/estimate/${actionName}`, {
    params: { ...params },
  })
  return response.data
}

export const postScore = async ({ userId, actionName, ...params }) => {
  // Get CSRF token
  const csrfResponse = await api.get(`/auth/csrf`)
  const { csrfToken } = csrfResponse.data.data
  // Attach CSRF token to the headers and send request up to backend
  const response = await api.post(`/cc/estimate/${actionName}`, {
    ...params,
    user_id: userId,
    headers: { 'X-CSRFToken': csrfToken },
  })
  return response.data
}

export const unpostScore = async ({ userId, actionName, ...params }) => {
  // POST request to save user answers to database
  // Get CSRF token before sending POST request
  const csrfResponse = await api.get(`/auth/csrf`)
  const { csrfToken } = csrfResponse.data.data
  // Attach CSRF token to the headers and send request up to backend
  const response = await api.post(`/cc/undo/${actionName}`, {
    ...params,
    user_id: userId,
    headers: { 'X-CSRFToken': csrfToken },
  })
  return response.data
}
// fetchGroups action, fetch all groups for user selection
export const fetchGroups = async () => {
  const response = await api.get(`/cc/info/groups`)
  return response.data.groupList
}
// createUser action, send POST request to backend to save user registration info to database
export const createUser = async (formValues, email, selected) => {
  /* params :
    first_name,
    last_name,
    email,
    locality,
    groups,
    minimum_age,
    accepts_terms_and_conditions */
  const params = {
    ...formValues,
    email,
    eventName: selected.name,
  }
  // Get CSRF token
  const csrfResponse = await api.get(`/auth/csrf`)
  const { csrfToken } = csrfResponse.data.data
  // Attach CSRF token to request's header and all information
  const response = await api.post(`/cc/users`, {
    ...params,
    headers: { 'X-CSRFToken': csrfToken },
  })
  return response.data
}
