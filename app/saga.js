import {hashSync} from 'bcryptjs'
import {browserHistory} from 'react-router'
import {take, call, put, fork, race, select} from 'redux-saga/effects'
import update from 'immutability-helper';
import connection from './sagas/basicForConnection.js'
import {
  getTopicData,
  getTopicThis
} from './sagas/specialForState.js'
import {
  updateObject,
  createObject,
  spliceArray,
  defineTime
} from './sagas/basicTool.js'
import {
  positionDecide,
  updateTopic,
  brickCell,
  defaultCell,
  defaultPlaceHolder,
  defaultContentPage
} from './sagas/specialForTopic.js'

import {
  EDITEDCONTENT_SUBMIT,
  AXIOS_POSTING,
  LOGOUT,
  REQUEST_ERROR,
  NEWTOPIC_SUBMIT,
  POSITIONCHANGE_SUBMIT,
  RECYCLEBRICK_SUBMIT,
  SUBMIT_BRICKCONTENT,
  SUBMIT_POSITIONCHANGE,
  SUBMIT_RECYCLEBRICK,
  SUBMIT_TOPIC
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
    const data = yield take(NEWTOPIC_SUBMIT);
    console.log('saga, newTopicSubmit start')
    const time = yield call(defineTime)
    const topicId = "topicBrick" + time.ms;

    let newRecord = {};
    newRecord = {
      topicId: topicId,
      topic: data.inputTopic,
      url: "/topic/" + topicId
    }
    let newPage = yield call(updateObject, defaultContentPage, {"topic": data.inputTopic})
    let pageObject = yield call(createObject, topicId, newPage)

    connection.post_NewTopic(newRecord, data.userName, pageObject)

    yield put({
      type: SUBMIT_TOPIC,
      newRecord: newRecord,
      pageObject: pageObject
    });
  }
}

export function * editedContentSubmit (){
  while (true) {
    const data = yield take(EDITEDCONTENT_SUBMIT);
    console.log('saga, editedContentSubmit start');

    const [topicThisState, time] = yield [
      select(getTopicThis, data.topicId),
      call(defineTime)
    ]
    const position = yield call(positionDecide, topicThisState, data.editingBrickRow, data.editingBrickIndex)

    let newRecord = {};
    newRecord = {
      "id":"brickOriginal" + time.ms,
      "class": "cell",
      "index": position.index,
      "row": position.row,
      "draftData_Sub": data.subEditorData,
      "draftData_Content": data.contentEditorData,
      "hashTagObj": data.hashTagObj,
      "hyphenObj": data.hyphenObj,
      "questionMarkobj": data.questionMarkobj
    }
    connection.post_EditedBrick(newRecord, position.row, position.index, data.topicId, data.userName)

    yield put({
      type: SUBMIT_BRICKCONTENT,
      newRecord: newRecord,
      row: position.row,
      index: position.index,
      topicId: data.topicId
    })
  }
}

export function * recycleBrickSubmit(){
  while (true) {
    const data = yield take(RECYCLEBRICK_SUBMIT);
    console.log('sage, recycleBrickSubmit start');

    connection.delete_Brick(defaultCell, data.clickedBrickRow, data.clickedBrickIndex, data.topicId, data.userName)

    yield put({
      type: SUBMIT_RECYCLEBRICK,
      row: data.clickedBrickRow,
      index: data.clickedBrickIndex,
      topicId: data.topicId
    })
  }
}
export function * positionChangeSubmit (){
  while(true){
    const data = yield take(POSITIONCHANGE_SUBMIT);
    console.log('saga, positionChangeSubmit start');

    let [originRow, originIndex, targetIndex, targetRow] = [data.originRow, data.originIndex, data.newIndex, data.newRow];

    yield put({
      type: SUBMIT_POSITIONCHANGE,
      originRow: originRow,
      originIndex: originIndex,
      targetRow: targetRow,
      targetIndex: targetIndex,
      topicId: data.topicId
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
  yield fork(editedContentSubmit)
  yield fork(recycleBrickSubmit)
}
