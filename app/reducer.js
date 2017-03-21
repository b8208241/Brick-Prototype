import {combineReducers} from 'redux';
import update from 'immutability-helper';
import {updateObject,createObject} from './sagas/basicTool.js';
import {defineTopic, updateTopic, updateRow, defaultCell} from './sagas/specialForTopic.js';

import {
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  SUBMIT_BRICKCONTENT,
  SUBMIT_POSITIONCHANGE,
  SUBMIT_TOPIC
} from './actions/constants.js'

function topicData (state={}, action) {
  switch (action.type) {
    case SUBMIT_TOPIC:
      console.log('SUBMIT_TOPIC')
      return update(state, {
        $merge: action.pageObject,
        "activeTopicRow": {$push: [action.newRecord]}
      })
      break;
    case SUBMIT_BRICKCONTENT:
      console.log('SUBMIT_BRICKCONTENT')
      return update(state, {
        [action.topicId]: {
          [action.row]: {
            [action.index]: {$set: action.newRecord}
          },
          "hashTag": {$push: [action.newRecord.brickTopic]}
        }
      });
      break;
    case SUBMIT_POSITIONCHANGE:
      console.log('SUBMIT_POSITIONCHANGE')
      return update(state, {
        [action.topicId]: {
          $apply: function(obj){
            let originBrick = update(obj[action.originRow][action.originIndex], {
              $merge: {"index": action.targetIndex, "row": action.targetRow}
            });
            let cellDefault = update(defaultCell, {
              $merge: {"index": action.originIndex, "row": action.originRow}
            });
            return update(obj, {
              [action.targetRow]: {
                [action.targetIndex]: {$set: originBrick}
              },
              [action.originRow]: {
                [action.originIndex]: {$set: cellDefault}
              }
            })
          }
        }
      })
      break;
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
