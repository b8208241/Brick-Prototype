import {combineReducers} from 'redux'

import {
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  SUBMIT_CONTENT,
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
      let topicData_updateTopic = state.topicData;
      topicData_updateTopic.topicRow.push(action.topic);
      topicData_updateTopic[action.topic.topicId] = action.topicContentPage;
      return {
        ...state,
        topicData: topicData_updateTopic
      }
    case SUBMIT_CONTENT:
      console.log('SUBMIT_CONTENT')
      const oldTopicDataObject = state.topicData
      const newTopicObject = updateTopic(oldTopicDataObject, action.topicId, action.row, action.cell)
      const newTopicDataObject = updateObject(oldTopicDataObject, newTopicObject)

      return{
        ...state,
        topicData: newTopicDataObject
      }
    default:
      return state
  }
}

function defineData(topicData, topicId) {
  console.log("enter defineData")
  return topicData[topicId]
}

function updateObject(oldObject, newValue) {
    return Object.assign({}, oldObject, newValue)
}

function createObject(key, value) {
  const obj = {}
  obj[key] = value
  return obj
}

function updateRowArray(oldRowArray, newBrick) {
  console.log('enter updateRowArray')
  const updatedRowArray = oldRowArray.map(function(oldItem){
    if(oldItem.index !== newBrick.index){
      return oldItem
    }

    const updatedItem = updateObject(oldItem, newBrick)
    return updatedItem
  })

  return updatedRowArray
}

function updateRow(oldTopicObject, row, newBrick) {
  console.log("enter updateRow")
  const oldRowArray = oldTopicObject[row]
  const newRowArray = updateRowArray(oldRowArray, newBrick)
  const updatedRowObject = createObject(row, newRowArray)

  return updatedRowObject
}

function updateTopic(oldTopicDataObject, id, row, newBrick) {
  console.log("enter updateTopic")
  const oldTopicObject = defineData(oldTopicDataObject, id)
  const newRowObject = updateRow(oldTopicObject, row, newBrick)
  const newPresentTopicObject = updateObject(oldTopicObject, newRowObject)
  const updatedTopicObject = createObject(id, newPresentTopicObject)

  return updatedTopicObject
}

export default reducer
