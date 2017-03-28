import {
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  LOGOUT,
  EDITEDCONTENT_SUBMIT,
  POSITIONCHANGE_SUBMIT,
  RECYCLEBRICK_SUBMIT
} from './constants.js'

export function EditedContentSubmit(subEditorData, contentEditorData, editingBrickRow, editingBrickIndex, topicId, userName) {
  return {type: EDITEDCONTENT_SUBMIT, subEditorData, contentEditorData, editingBrickRow, editingBrickIndex, topicId, userName}
}

export function positionChangeSubmit(originIndex, originRow, newIndex, newRow, topicId) {
  return {type: POSITIONCHANGE_SUBMIT, originIndex, originRow, newIndex, newRow, topicId}
}

export function RecycleBrickSubmit(clickedBrickRow, clickedBrickIndex,topicId, userName) {
  return {type: RECYCLEBRICK_SUBMIT, clickedBrickRow, clickedBrickIndex, topicId, userName}
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
