import React from 'react'
import {Provider} from 'react-redux'
import {Router, Route, browserHistory} from 'react-router'
import Routes from './pages/Routes.jsx'
import {clearError} from './actions/Main.js'

export default class Brick extends React.Component {
  constructor (props) {
    super(props);
    this.checkAuthState = this.checkAuthState.bind(this);
  }

  checkAuthState (nextState, replace) {
    let {loggedIn} = this.props.store.getState();
    this.props.store.dispatch(clearError());

    console.log(loggedIn)
    if (loggedIn) {
      console.log(nextState.location.state)
      if (nextState.location.state && nextState.location.pathname) {
        console.log('loggedIn, and has pathname')
        replace(nextState.location.pathname)
      } else {
        console.log('No loggedIn')
        replace('/')
      }
    }
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <Router routes={Routes} history={browserHistory}/>
      </Provider>
    )
  }
}
