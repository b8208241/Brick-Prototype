import React from 'react'
import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import Routes from './pages/Routes.jsx'
import {clearError} from './actions/Main.js'

export default class Brick extends React.Component {
  constructor (props) {
    super(props);
    this.authState = this.authState.bind(this);
  }

  authState (nextState, replace) {
    let {loggedIn} = this.props.store.getState();
    this.props.store.dispatch(clearError());
    if (loggedIn) {
      console.log(nextState.location.state)
      if (nextState.location.state && nextState.location.pathname) {
        console.log('loggedIn, and has pathname')
        replace(nextState.location.pathname)
      } else {
        replace('/')
      }
    }else if (!loggedIn) {
      replace('/')
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
