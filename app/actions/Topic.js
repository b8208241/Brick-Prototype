import {
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  LOGOUT,
  EDITEDBRICK_SUBMIT,
  POSITIONCHANGE_SUBMIT,
} from './constants.js'

export function EditedBrickSubmit(tagEditorData, contentEditorData, topicId) {
  return {type: EDITEDBRICK_SUBMIT, tagEditorData, contentEditorData, topicId}
}

export function positionChangeSubmit(originIndex, originRow, newIndex, newRow, topicId) {
  return {type: POSITIONCHANGE_SUBMIT, originIndex, originRow, newIndex, newRow, topicId}
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
