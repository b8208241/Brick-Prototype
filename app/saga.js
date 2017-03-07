import {hashSync} from 'bcryptjs'
import {browserHistory} from 'react-router'
import {take, call, put, fork, race, select} from 'redux-saga/effects'
import connection from './sagas/connection.js'
import {getTopicData, getTopicThis, getMemoRecords} from './sagas/getState.js'
import {
  updateObject,
  createObject,
  spliceArray
} from './sagas/modifier.js'
import {
  defineTime,
  positionDecide,
  insertBrick,
  updateMemoRecords,
  updateTopic,
  updateRow,
  brickCell,
  defaultCell,
  defaultPlaceHolder,
  defaultContentPage
} from './sagas/topicData.js'

import {
  BRICKCONTENT_SUBMIT,
  SENDING_REQUEST,
  LOGOUT,
  REQUEST_ERROR,
  NEWMEMO_SUBMIT,
  NEWTOPIC_SUBMIT,
  POSITIONCHANGE_SUBMIT,
  SUBMIT_BRICKCONTENT,
  SUBMIT_MEMO,
  SUBMIT_POSITIONCHANGE,
  UPDATE_TOPIC
} from './actions/constants.js'

/**
 * Effect to handle logging out
 */
export function * logout () {
  // We tell Redux we're in the middle of a request
  yield put({type: SENDING_REQUEST, sending: true})

  // Similar to above, we try to log out by calling the `logout` function in the
  // `auth` module. If we get an error, we send an appropiate action. If we don't,
  // we return the response.
  try {
    let response = yield call(auth.logout)
    yield put({type: SENDING_REQUEST, sending: false})

    return response
  } catch (error) {
    yield put({type: REQUEST_ERROR, error: error.message})
  }
}

/**
 * Log out saga
 * This is basically the same as the `if (winner.logout)` of above, just written
 * as a saga that is always listening to `LOGOUT` actions
 */
export function * logoutFlow () {
  while (true) {
    yield take(LOGOUT)
    yield put({type: SET_AUTH, newAuthState: false})

    yield call(logout)
    forwardTo('/login')
  }
}

/**
Main page, fired when user submit a new topic.
*/
export function * newTopicSubmit(){
  while(true){
    let data = yield take(NEWTOPIC_SUBMIT);
    console.log('saga, newTopicSubmit start')
    const [topicData, time] = yield [
      select(getTopicData),
      call(defineTime)
    ]
    let topicId = "topicBrick" + time.ms;
    let url = "/topic/" + topicId;
    let userName = data.userName;
    let topicText = data.inputTopic;

    topicData.activeTopicRow.push({topicId: topicId, topic: topicText, url: url})
    defaultContentPage.topic=topicText;
    const [updatedActiveTopicRow, newContentPage] = yield [
      call(createObject, "activeTopicRow", topicData.activeTopicRow),
      call(createObject, topicId, defaultContentPage)
    ]
    const updatedComponent = yield call(updateObject, updatedActiveTopicRow, newContentPage)
    //connection.post_NewTopic(topicId, topicText, url, userName)

    console.log('ready to put UPDATE_TOPIC')
    yield put({
      type: UPDATE_TOPIC,
      updatedComponent: updatedComponent
    });
  }
}

export function * newMemoSubmit (){
  while(true){
    let data = yield take(NEWMEMO_SUBMIT);
    console.log('saga, newMemoSubmit start')
    const [topicThisState, time] = yield [
      select(getTopicThis, data.topicId),
      call(defineTime)
    ]
    const topicThisData = yield call(updateObject, {}, topicThisState);
    const position = yield call(positionDecide, topicThisData)
    const memoRecords = topicThisData.memoRecords;

    let newRecord = {
      "memoIndex":memoRecords.length,
      "memoTime": time.localDate,
      "id":"brickOriginal" + time.ms,
      "brickTopic": data.brickTopic,
      "text":data.text,
      "ref":data.ref,
      "class":"cell",
      "index": 0,
      "row": position.row
    }

    const newMemoRecordsObj = yield call(updateMemoRecords, memoRecords, newRecord)
    /*let newRowObject
    if(position.insert){
      newRowObject = yield call(insertBrick, topicThisData[position.row],  position.row, newRecord)
    }else{
      topicThisData[position.row][0] = newRecord;
      newRowObject = yield call(createObject, position.row, topicThisData[position.row])
    }

    const memoRowObject = yield call(updateObject, newMemoRecordsObj, newRowObject)*/
    const updatedTopicThis = yield call(updateTopic, topicThisData, data.topicId, newMemoRecordsObj)

    yield put({
      type: SUBMIT_MEMO,
      updatedTopicThis: updatedTopicThis
    })
  }
}

export function * brickContentSubmit (){
  while(true){
    const data = yield take(BRICKCONTENT_SUBMIT);
    console.log('saga, brickContentSubmit start');

    const time = yield call(defineTime);
    const record = data.record;
    let newRecord = {};
    if(record.class === "cell"){
      newRecord = {
        "memoIndex":record.memoIndex,
        "memoTime": record.memoTime,
        "id":record.id,
        "brickTopic": data.brickTopicData.blocks[0].text,
        "text": data.brickTextData.blocks[0].text,
        "ref": record.ref,
        "class": record.class,
        "index": record.index,
        "row": record.row,
        "draftBrickTopicData": data.brickTopicData,
        "draftBrickTextData": data.brickTextData
      }
    }else{
      newRecord = {
        "memoIndex":"",
        "memoTime": "",
        "id":"brickOriginal" + time.ms,
        "brickTopic": data.brickTopicData.blocks[0].text,
        "text": data.brickTextData.blocks[0].text,
        "ref": "",
        "class": "cell",
        "index": data.index,
        "row": data.row,
        "draftBrickTopicData": data.brickTopicData,
        "draftBrickTextData": data.brickTextData
      }
    }

    yield put({
      type: SUBMIT_BRICKCONTENT,
      newRecord: newRecord,
      row: data.row,
      index: data.index,
      topicId: data.topicId
    })
  }
}

export function * positionChangeSubmit (){
  while(true){
    const data = yield take(POSITIONCHANGE_SUBMIT);
    console.log('saga, positionChangeSubmit start');

    const topicThisState = yield select(getTopicThis, data.topicId);
    const topicThisData = yield call(updateObject, {}, topicThisState);
    let [originRow, originIndex, targetIndex, targetRow] = [data.originRow, data.originIndex, data.newIndex, data.newRow];
    let originBrickContent = topicThisData[originRow][originIndex];

    let newbrickContent = {
      "class":"cell",
      "index":targetIndex,
      "row":targetRow,
      "id":originBrickContent.id,
      "memoIndex":originBrickContent.memoIndex,
      "brickTopic": originBrickContent.brickTopic,
      "text":originBrickContent.text,
      "ref":originBrickContent.ref
    }
    let replaceCellDefault = {
      "class":"cell-default cboxElement",
      "index":originIndex,
      "row":originRow,
      "id":"",
      "memoIndex":"",
      "brickTopic":"",
      "text":"",
      "ref":""
    }

    topicThisData[originRow][originIndex] = replaceCellDefault;
    topicThisData[targetRow][targetIndex] = newbrickContent;

    yield put({
      type: SUBMIT_POSITIONCHANGE,
      updatedTopicThis: topicThisData
    })
  }
}

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default function * rootSaga () {
  yield fork(logoutFlow)
  yield fork(newTopicSubmit)
  yield fork(positionChangeSubmit)
  yield fork(newMemoSubmit)
  yield fork(brickContentSubmit)
}
