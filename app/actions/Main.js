import {
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  REGISTER_REQUEST,
  LOGOUT,
  NEWTOPIC_SUBMIT,
  NEWCONTENT_SUBMIT
} from './constants.js'

/**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 * @param  {boolean} sending True means we're sending a request, false means we're not
 */
export function sendingRequest (sending) {
  return {type: SENDING_REQUEST, sending}
}

/**
 * Tells the app we want to log out a user
 */
export function logout () {
  return {type: LOGOUT}
}

/**
 * Tells the app we want to register a user
 * @param  {object} data          The data we're sending for registration
 * @param  {string} data.username The username of the user to register
 * @param  {string} data.password The password of the user to register
 */
export function registerRequest (data) {
  return {type: REGISTER_REQUEST, data}
}

/**
 * Sets the `error` state to the error received
 * @param  {object} error The error we got when trying to make the request
 */
export function requestError (error) {
  return {type: REQUEST_ERROR, error}
}

/**
 * Sets the `error` state as empty
 */
export function clearError () {
  return {type: CLEAR_ERROR}
}


export function newTopicSubmit (inputTopic) {
  return {type: NEWTOPIC_SUBMIT, inputTopic}
}
