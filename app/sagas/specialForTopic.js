import {take, call, put, fork, race, select} from 'redux-saga/effects'
import {
  updateObject,
  createObject,
  spliceArray,
  defineTime
} from './basicTool.js';

export const brickCell = {"class":"cell","index":"", "row":"", "id":"", "brickTopic":"", "text":"", "ref":"", "draftBrickTopicData":"", "draftBrickTextData": ""}
export const defaultCell = {"class":"cell-default cboxElement","index":"", "row":"", "id":"", "brickTopic":"", "text":"", "ref":"", "draftBrickTopicData":"", "draftBrickTextData": ""}
export const defaultPlaceHolder = {"class":"placeholder","index":"", "row":"", "id":""}
export const defaultContentPage = {
  "topic":"",
  "1":[{"class":"cell-default cboxElement","index":0, "row":"1", "id":"", "brickTopic":"", "text":"", "ref":"", "draftBrickTopicData":"", "draftBrickTextData": ""}, {"class":"placeholder","index":"1", "row":"1", "id":""}, {"class":"cell-default cboxElement","index":2, "row":"1", "id":"", "brickTopic":"", "text":"", "ref":"", "draftBrickTopicData":"", "draftBrickTextData": ""}, {"class":"placeholder","index":"3", "row":"1", "id":""}, {"class":"cell-default cboxElement","index":4, "row":"1", "id":"", "brickTopic":"", "text":"", "ref":"", "draftBrickTopicData":"", "draftBrickTextData": ""}, {"class":"placeholder","index":"5", "row":"1", "id":""}],
  "2":[{"class":"cell-default cboxElement","index":0, "row":"2", "id":"", "brickTopic":"", "text":"", "ref":"", "draftBrickTopicData":"", "draftBrickTextData": ""}, {"class":"placeholder","index":"1", "row":"2", "id":""}, {"class":"cell-default cboxElement","index":2, "row":"2", "id":"", "brickTopic":"", "text":"", "ref":"", "draftBrickTopicData":"", "draftBrickTextData": ""}, {"class":"placeholder","index":"3", "row":"2", "id":""}, {"class":"cell-default cboxElement","index":4, "row":"2", "id":"", "brickTopic":"", "text":"", "ref":"", "draftBrickTopicData":"", "draftBrickTextData": ""}, {"class":"placeholder","index":"5", "row":"2", "id":""}],
  "3":[{"class":"cell-default cboxElement","index":0, "row":"3", "id":"", "brickTopic":"", "text":"", "ref":"", "draftBrickTopicData":"", "draftBrickTextData": ""}, {"class":"placeholder","index":"1", "row":"3", "id":""}, {"class":"cell-default cboxElement","index":2, "row":"3", "id":"", "brickTopic":"", "text":"", "ref":"", "draftBrickTopicData":"", "draftBrickTextData": ""}, {"class":"placeholder","index":"3", "row":"3", "id":""}, {"class":"cell-default cboxElement","index":4, "row":"3", "id":"", "brickTopic":"", "text":"", "ref":"", "draftBrickTopicData":"", "draftBrickTextData": ""}, {"class":"placeholder","index":"5", "row":"3", "id":""}],
  "4":[{"class":"cell-default cboxElement","index":0, "row":"4", "id":"", "brickTopic":"", "text":"", "ref":"", "draftBrickTopicData":"", "draftBrickTextData": ""}, {"class":"placeholder","index":"1", "row":"4", "id":""}, {"class":"cell-default cboxElement","index":2, "row":"4", "id":"", "brickTopic":"", "text":"", "ref":"", "draftBrickTopicData":"", "draftBrickTextData": ""}, {"class":"placeholder","index":"3", "row":"4", "id":""}, {"class":"cell-default cboxElement","index":4, "row":"4", "id":"", "brickTopic":"", "text":"", "ref":"", "draftBrickTopicData":"", "draftBrickTextData": ""}, {"class":"placeholder","index":"5", "row":"4", "id":""}]
}

export function defineTopic(topicData, topicId) {
  console.log("enter defineData")
  return topicData[topicId]
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

export function positionDecide(topicThis){
  console.log('enter positionDecide')
  let position
  let i
  for(i = 4 ; i>0 ; i--){
    let rowRecords = topicThis[String(i)];
    let j
    let max
    let stop
    if(i = 4 || 1){
      max = 8
    }else{
      max = 10
    }
    for(j = 0; j<max ; j++){
      if(rowRecords[j].class == "cell-default cboxElement"){
        position = {row: i, index: j}
        stop = true;
        break;
      }else{
        continue;
      }
    }
    if(stop){
      break;
    }
  }
  return position;
}
