import React from 'react';
import ReactDOM from 'react-dom';
import Brick from './app/Brick.jsx';
import Login from './app/pages/Login.jsx'

import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './app/reducer.js'
import rootSaga from './app/saga.js'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

//Check status
let {loggedIn} = store.getState();
if(loggedIn) {
  ReactDOM.render(<Brick store={store}/>, document.getElementById("app"));
}else if(!loggedIn) {
  ReactDOM.render(
    <Provider store={store}>
      <Login/>
    </Provider>,
    document.getElementById("app"));
}
