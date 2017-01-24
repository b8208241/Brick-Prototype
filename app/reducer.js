import {combineReducers} from 'redux'
import {defineTopic, updateTopic, updateRow, updateObject} from './sagas/topicData.js'

import {
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  SUBMIT_CONTENT,
  SUBMIT_POSITIONCHANGE,
  UPDATE_TOPIC
} from './actions/constants.js'


// Takes care of changing the application state
function reducer (state, action) {
  switch (action.type) {
    case SENDING_REQUEST:
      return {...state, currentlySending: action.sending}
    case REQUEST_ERROR:
      return {...state, error: action.error}
    case CLEAR_ERROR:
      return {...state, error: ''}
    case UPDATE_TOPIC:
      console.log('UPDATE_TOPIC')
      const topicData_updateTopic = updateObject(state.topicData, action.updatedComponent);

      return {
        ...state,
        topicData: topicData_updateTopic
      }
    case SUBMIT_CONTENT:
      console.log('SUBMIT_CONTENT')
      const topicData_submitContent = updateObject(state.topicData, action.updatedTopicThis)

      return{
        ...state,
        topicData: topicData_submitContent
      }
    case SUBMIT_POSITIONCHANGE:
      console.log('SUBMIT_POSITIONCHANGE')
      const topicData_positionChanged = updateObject(state.topicData, action.updatedTopicThis)

      return{
        ...state,
        topicData: topicData_positionChanged
      }
    default:
      return state
  }
}

export default reducer
