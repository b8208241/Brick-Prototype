//Important!! "babel-polyfill" is for es6 technique
import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './app/reducer.js'
import rootSaga from './app/saga.js'

import Brick from './app/Brick_bundle.jsx';

const sagaMiddleware = createSagaMiddleware();
const preloadedState = window.__PRELOADED_STATE__
const store = createStore(
  reducer,
  preloadedState,
  applyMiddleware(sagaMiddleware)
);

console.log('start run rootSaga')
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Brick store={store}/>, document.getElementById("app"));
