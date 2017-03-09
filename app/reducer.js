import {combineReducers} from 'redux'
import {updateObject,createObject} from './sagas/basicTool.js';
import {defineTopic, updateTopic, updateRow} from './sagas/specialForTopic.js';

import {
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  SUBMIT_BRICKCONTENT,
  SUBMIT_MEMO,
  SUBMIT_POSITIONCHANGE,
  UPDATE_TOPIC
} from './actions/constants.js'

function topicData (state={}, action) {
  switch (action.type) {
    case UPDATE_TOPIC:
      console.log('UPDATE_TOPIC')
      return updateObject(state, action.updatedComponent);

    case SUBMIT_MEMO:
      console.log('SUBMIT_MEMO')
      return updateObject(state, action.updatedTopicThis);

    case SUBMIT_BRICKCONTENT:
      console.log('SUBMIT_BRICKCONTENT')
      let topicThis = state[action.topicId];
      topicThis[action.row][action.index] = action.newRecord;
      const updatedTopicThis = createObject(action.topicId, topicThis);
      return updateObject(state, updatedTopicThis)

    case SUBMIT_POSITIONCHANGE:
      console.log('SUBMIT_POSITIONCHANGE')
      return updateObject(state, action.updatedTopicThis)

    default:
      return state
  }
}

// Takes care of changing the application state
function others (state={}, action) {
  switch (action.type) {
    case SENDING_REQUEST:
      return {...state, currentlySending: action.sending}
    case REQUEST_ERROR:
      return {...state, error: action.error}
    case CLEAR_ERROR:
      return {...state, error: ''}
    default:
      return state
  }
}

export default combineReducers({
  topicData,
  others
})
