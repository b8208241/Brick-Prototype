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
  rowDecide,
  insertBrick,
  updateMemoRecords,
  updateTopic,
  updateRow,
  defaultCell,
  defaultPlaceHolder,
  defaultContentPage
} from './sagas/topicData.js'

import {
  SENDING_REQUEST,
  LOGOUT,
  REQUEST_ERROR,
  NEWMEMO_SUBMIT,
  NEWTOPIC_SUBMIT,
  POSITIONCHANGE_SUBMIT,
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
    let topicId = "topicBrick" + time;
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
    const [topicThis, time] = yield [
      select(getTopicThis, data.topicId),
      call(defineTime)
    ]
    const row = yield call(rowDecide, topicThis)
    const memoRecords = topicThis.memoRecords;

    let newRecord = {
      "memoIndex":memoRecords.length,
      "id":"brickOriginal" + time,
      "text":data.text,
      "ref":data.ref,
      "class":"cell",
      "index": 0,
      "row": row
    }

    const [newMemoRecordsObj, newRowObject] = yield [
      call(updateMemoRecords, memoRecords, newRecord),
      call(insertBrick, topicThis[row], row, newRecord)
    ]

    const memoRowObject = yield call(updateObject, newMemoRecordsObj, newRowObject)
    const updatedTopicThis = yield call(updateTopic, topicThis, data.topicId, memoRowObject)

    yield put({
      type: SUBMIT_MEMO,
      updatedTopicThis: updatedTopicThis
    })
  }
}

export function * positionChangeSubmit (){
  while(true){
    let data = yield take(POSITIONCHANGE_SUBMIT);
    console.log('saga, positionChangeSubmit start')
    let topicId = data.topicId
    let originRow = data.originRow
    let originIndex = data.originIndex
    let newRow = data.newRow
    let newIndex = data.newIndex
    const topicThis = yield select(getTopicThis, topicId)

    const originBrick = topicThis[originRow][originIndex]
    const brickContent = yield call(updateObject, originBrick, {row: newRow, index: newIndex})
    defaultCell.index = originIndex
    defaultCell.row = originRow

    let [newTargetRowObject, newOriginRowObject] = yield [
      call(updateRow, topicThis, newRow, brickContent),
      call(updateRow, topicThis, originRow, defaultCell)
    ]

    const changedRow = yield call(updateObject, newTargetRowObject, newOriginRowObject)
    const updatedTopicThis = yield call(updateTopic, topicThis, topicId, changedRow)

    console.log('ready to put SUBMIT_POSITIONCHANGE')
    yield put({
      type: SUBMIT_POSITIONCHANGE,
      updatedTopicThis: updatedTopicThis
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
}
