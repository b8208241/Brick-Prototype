import {
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  LOGOUT,
  NEWMEMO_SUBMIT,
  POSITIONCHANGE_SUBMIT,
  BRICKCONTENT_SUBMIT
} from './constants.js'

export function newMemoSubmit (brickTopic, text, ref, topicId) {
  return {type: NEWMEMO_SUBMIT, brickTopic, text, ref, topicId}
}

export function positionChangeSubmit(originIndex, originRow, newIndex, newRow, topicId) {
  return {type: POSITIONCHANGE_SUBMIT, originIndex, originRow, newIndex, newRow, topicId}
}

export function brickContentSubmit(brickTopicData, brickTextData, row, index, record, topicId) {
  return {type: BRICKCONTENT_SUBMIT, brickTopicData, brickTextData, row, index, record, topicId}
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
