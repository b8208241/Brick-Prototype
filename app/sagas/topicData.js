import {take, call, put, fork, race, select} from 'redux-saga/effects'
import {
  updateObject,
  createObject,
  spliceArray
} from './modifier.js';

export const brickCell = {"class":"cell", "index":"", "row":"", "id":"", "memoIndex":"", "text":"", "ref":""}
export const defaultCell = {"class":"cell-default cboxElement","index":"", "row":"", "id":"", "memoIndex":"", "text":"", "ref":""}
export const defaultPlaceHolder = {"class":"placeholder", "index":"", "row":"", "id":"", "memoIndex":"", "text":"", "ref":""}
export const defaultContentPage = {
  "topic":"",
  "memoRecords":[],
  "1":[{"class":"cell-default cboxElement", "index":0, "row":"1", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"placeholder", "index":1, "row":"1", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"cell-default cboxElement", "index":2, "row":"1", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"placeholder", "index":3, "row":"1", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"cell-default cboxElement", "index":4, "row":"1", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"placeholder", "index":5, "row":"1", "id":"", "memoIndex":"", "text":"", "ref":""}],
  "2":[{"class":"cell-default cboxElement", "index":0, "row":"2", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"placeholder", "index":1, "row":"2", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"cell-default cboxElement", "index":2, "row":"2", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"placeholder", "index":3, "row":"2", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"cell-default cboxElement", "index":4, "row":"2", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"placeholder", "index":5, "row":"2", "id":"", "memoIndex":"", "text":"", "ref":""}],
  "3":[{"class":"cell-default cboxElement", "index":0, "row":"3", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"placeholder", "index":1, "row":"3", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"cell-default cboxElement", "index":2, "row":"3", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"placeholder", "index":3, "row":"3", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"cell-default cboxElement", "index":4, "row":"3", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"placeholder", "index":5, "row":"3", "id":"", "memoIndex":"", "text":"", "ref":""}],
  "4":[{"class":"cell-default cboxElement", "index":0, "row":"4", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"placeholder", "index":1, "row":"4", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"cell-default cboxElement", "index":2, "row":"4", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"placeholder", "index":3, "row":"4", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"cell-default cboxElement", "index":4, "row":"4", "id":"", "memoIndex":"", "text":"", "ref":""}, {"class":"placeholder", "index":5, "row":"4", "id":"", "memoIndex":"", "text":"", "ref":""}]
}

export function defineTime(){
  let date = new Date();
  let time = {
    ms: date.getTime(),
    localDate: date.toLocaleDateString()
  }
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

export function updateRow(oldRow, row, brickContent) {
  console.log("enter updateRow")
  const newRowArray = updateRowArray(oldRow, brickContent)
  const updatedRowObject = createObject(row, oldRow)

  return updatedRowObject
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

export function positionDecide(topicThis){
  console.log('enter positionDecide')
  let position
  let i
  for(i = 4 ; i>0 ; i--){
    console.log('enter positionDecide, for loop')
    let rowRecords = topicThis[String(i)];
    if((rowRecords.length)*2+i > 19 && rowRecords[0].class == "cell"){
      console.log('enter positionDecide, for loop, next row')
      continue;
    }else{
      console.log('enter positionDecide, for loop, row '+i)
      if(rowRecords[0].class !== "cell"){
        position = {row: i, insert: false};
        break;
      }else{
        position = {row: i, insert: true};
        break;
      }
    }
  }

  return position;
}
