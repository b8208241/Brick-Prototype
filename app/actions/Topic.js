import {
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  LOGOUT,
  NEWCONTENT_SUBMIT
} from './constants.js'

export function newContentSubmit (text, ref, containerIndex, containerRow, topicId) {
  return {type: NEWCONTENT_SUBMIT, text, ref, containerIndex, containerRow, topicId}
}

export function requestError (error) {
  return {type: REQUEST_ERROR, error}
}

/**
 * Sets the `error` state as empty
 */
export function clearError () {
  return {type: CLEAR_ERROR}
}

/**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 */
export function sendingRequest (sending) {
  return {type: SENDING_REQUEST, sending}
}
