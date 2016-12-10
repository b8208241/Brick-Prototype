import React from 'react'
import {Router, Route, browserHistory} from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux'

import reducer from './reducer.js'
import rootSaga from './saga.js'
import {clearError} from './actions/auth.js'

import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Main from './pages/Main.jsx'


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);


export default class Brick extends React.Component {
  constructor (props) {
    super(props);
    this.authState = this.authState.bind(this);
  }

  authState (nextState, replace) {
    let {loggedIn} = store.getState();
    store.dispatch(clearError());

    if (!loggedIn) {
      replace('/login')
    }
  }

  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/login' component={Login} />
          <Route onEnter={this.authState}>
            <Route path='/' component={Main}>
            </Route>
          </Route>
        </Router>
      </Provider>
    )
  }
}
