import {hashSync} from 'bcryptjs'
import {browserHistory} from 'react-router'
import {take, call, put, fork, race, select} from 'redux-saga/effects'
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
  EDITEDBRICK_SUBMIT,
  SENDING_REQUEST,
  LOGOUT,
  REQUEST_ERROR,
  NEWTOPIC_SUBMIT,
  POSITIONCHANGE_SUBMIT,
  SUBMIT_BRICKCONTENT,
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

export function * editedBrickSubmit (){
  while (true) {
    const data = yield take(EDITEDBRICK_SUBMIT);
    console.log('saga, editedBrickSubmit start');

    const [topicThisState, time] = yield [
      select(getTopicThis, data.topicId),
      call(defineTime)
    ]
    const position = yield call(positionDecide, topicThisState)

    let newRecord = {};
    newRecord = {
      "id":"brickOriginal" + time.ms,
      "brickTopic": data.tagEditorData.blocks[0].text,
      "text": data.contentEditorData.blocks[0].text,
      "ref": "",
      "class": "cell",
      "index": position.index,
      "row": position.row,
      "draftBrickTopicData": data.tagEditorData,
      "draftBrickTextData": data.contentEditorData
    }
    let newTagArray = [];
    newTagArray.push(data.tagEditorData.blocks[0].text)

    yield put({
      type: SUBMIT_BRICKCONTENT,
      newRecord: newRecord,
      newTagArray: newTagArray,
      row: position.row,
      index: position.index,
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
      "brickTopic": originBrickContent.brickTopic,
      "text":originBrickContent.text,
      "ref":originBrickContent.ref,
      "draftBrickTopicData": originBrickContent.draftBrickTopicData,
      "draftBrickTextData": originBrickContent.draftBrickTextData
    }
    let replaceCellDefault = {
      "class":"cell-default cboxElement",
      "index":originIndex,
      "row":originRow,
      "id":"",
      "brickTopic":"",
      "text":"",
      "ref":"",
      "draftBrickTopicData":"",
      "draftBrickTextData": ""
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
  yield fork(editedBrickSubmit)
}
