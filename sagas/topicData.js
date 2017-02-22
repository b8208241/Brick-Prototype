import {take, call, put, fork, race, select} from 'redux-saga/effects'
import {
  updateObject,
  createObject,
  spliceArray
} from './modifier.js';

export const defaultCell = {"class":"cell-default cboxElement","index":"", "row":"", "id":"", "memoIndex":"", "text":"", "ref":""}
export const defaultPlaceHolder = {"class":"placeholder", "index":"", "row":""}
export const defaultContentPage = {
  "topic":"",
  "1":[{"class":"cell-default cboxElement", "index":0, "row":"1"}, {"class":"placeholder", "index":1, "row":"1"}, {"class":"cell-default cboxElement", "index":2, "row":"1"}, {"class":"placeholder", "index":3, "row":"1"}, {"class":"cell-default cboxElement", "index":4, "row":"1"}, {"class":"placeholder", "index":5, "row":"1"}],
  "2":[{"class":"cell-default cboxElement", "index":0, "row":"2"}, {"class":"placeholder", "index":1, "row":"2"}, {"class":"cell-default cboxElement", "index":2, "row":"2"}, {"class":"placeholder", "index":3, "row":"2"}, {"class":"cell-default cboxElement", "index":4, "row":"2"}, {"class":"placeholder", "index":5, "row":"2"}],
  "3":[{"class":"cell-default cboxElement", "index":0, "row":"3"}, {"class":"placeholder", "index":1, "row":"3"}, {"class":"cell-default cboxElement", "index":2, "row":"3"}, {"class":"placeholder", "index":3, "row":"3"}, {"class":"cell-default cboxElement", "index":4, "row":"3"}, {"class":"placeholder", "index":5, "row":"3"}],
  "4":[{"class":"cell-default cboxElement", "index":0, "row":"4"}, {"class":"placeholder", "index":1, "row":"4"}, {"class":"cell-default cboxElement", "index":2, "row":"4"}, {"class":"placeholder", "index":3, "row":"4"}, {"class":"cell-default cboxElement", "index":4, "row":"4"}, {"class":"placeholder", "index":5, "row":"4"}]
}

export function defineTime(){
  let date = new Date();
  let time = date.getTime();
  return time;
}

export function defineTopic(topicData, topicId) {
  console.log("enter defineData")
  return topicData[topicId]
}

export function updateRowArray(oldRowArray, brickContent) {
  console.log('enter updateRowArray')
  const updatedRowArray = oldRowArray.map(function(item){
    if(item.index !== brickContent.index){
      return item
    }

    const updatedItem = updateObject(item, brickContent)
    return updatedItem
  })

  return updatedRowArray
}

export function updateRow(oldTopicObject, row, brickContent) {
  console.log("enter updateRow")
  const oldRowArray = oldTopicObject[row]
  const newRowArray = updateRowArray(oldRowArray, brickContent)
  const updatedRowObject = createObject(row, newRowArray)

  return updatedRowObject
}

export function rowDecide(topicThis){
  console.log('enter rowDecide')
  if(topicThis["4"].length < 8){
    return "4"
  }else {
    if(topicThis['3'].length < 10){
      return "3"
    }else {
      if(topicThis['2'].length < 10){
        return "2"
      }else {
        if(topicThis['1'].length < 10){
          return "1"
        }else {
          alert("請刪減磚頭")
        }
      }
    }
  }
}

export function updateTopic(oldTopicObject, topicId, newObject) {
  console.log("enter updateTopic")
  const newThisTopicObject = updateObject(oldTopicObject, newObject)
  const updatedTopicObject = createObject(topicId, newThisTopicObject)

  return updatedTopicObject
}

export function * updateMemoRecords(memoRecords, newRecord){
  memoRecords.push(newRecord);
  return yield call(createObject, "memoRecords", memoRecords);
}

export function * insertBrick(targetRow, row, newRecord){
  targetRow.map(function(item){
    console.log('enter map in insertBrick')
    item.index = item.index+2
  })
  let placeHolder = Object.assign({}, defaultPlaceHolder, {"index": 1, "row": row})
  let rowArray = yield call(spliceArray, targetRow, 0, 0, [newRecord, placeHolder]);

  return yield call(createObject, row, rowArray)
}
