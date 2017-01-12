import {combineReducers} from 'redux'

import {
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
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
      let topicSaved = state.brickData.topicSaved;
      let updatedTopicSaved = topicSaved.push(action.topic)
      let topicContent = state.brickData.topicContent
      topicContent[action.topic.topicId] = {}
      return {
        ...state,
        brickData: {"topicSaved": updatedTopicSaved, "topicContent": topicContent}
      }
    default:
      return state
  }
}

export default reducer
