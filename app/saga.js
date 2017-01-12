import {hashSync} from 'bcryptjs'
import {browserHistory} from 'react-router'
import {take, call, put, fork, race} from 'redux-saga/effects'
import connection from './sagas/connection.js'

import {
  SENDING_REQUEST,
  LOGOUT,
  REQUEST_ERROR,
  NEWTOPIC_SUBMIT,
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
    let input = yield take(NEWTOPIC_SUBMIT);

    let date = new Date();
    let time = date.getTime();
    let topicId = "topicBrick" + time;
    let url = "/topic/" + topicId;

    let userName = input.userName;
    let topic = input.inputTopic;

    connection.post_NewTopic(topicId, topic, url, userName)

    console.log('ready to put UPDATE_TOPIC')
    yield put({type: UPDATE_TOPIC, topic: {topicId: topicId, topic: input.inputTopic, url: url}});
  }
}

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default function * rootSaga () {
  yield fork(logoutFlow)
  yield fork(newTopicSubmit)
}
