import {combineReducers} from 'redux';
import update from 'immutability-helper';
import {updateObject,createObject} from './sagas/basicTool.js';
import {defineTopic, updateTopic, updateRow, defaultCell} from './sagas/specialForTopic.js';

import {
  AXIOS_POSTING,
  REQUEST_ERROR,
  CLEAR_ERROR,
  SUBMIT_BRICKCONTENT,
  SUBMIT_POSITIONCHANGE,
  SUBMIT_RECYCLEBRICK,
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
    case SUBMIT_RECYCLEBRICK:
      console.log('SUBMIT_RECYCLEBRICK')
      return update(state, {
        [action.topicId]: {
          $apply: function(obj){
            let cellDefault = update(defaultCell, {
              $merge: {"index": action.index, "row": action.row}
            });
            return update(obj, {
              [action.row]: {
                [action.index]: {$set: cellDefault}
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

function status (state={}, action) {
  switch (action.type) {
    case AXIOS_POSTING:
      return {...state, currentlySending: action.sending}
    case REQUEST_ERROR:
      return {...state, error: action.error}
    case CLEAR_ERROR:
      return {...state, error: ''}

      break;
    default:
      return state
  }
}

function others (state={}, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  topicData,
  status,
  others
})
