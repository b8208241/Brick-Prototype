import React from 'react'
import {Router, Route, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import {clearError} from './actions/auth.js'
//import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Main from './pages/Main.jsx'

export default class Brick extends React.Component {
  constructor (props) {
    super(props);
    this.authState = this.authState.bind(this);
  }

  authState (nextState, replace) {
    let {loggedIn} = this.props.store.getState();
    this.props.store.dispatch(clearError());

    if (!loggedIn) {
      replace('/login')
    }
  }

  render () {
    return (
      <Provider store={this.props.store}>
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
