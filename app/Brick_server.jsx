import React from 'react'
import {Provider} from 'react-redux'
import {RouterContext} from 'react-router'
import {clearError} from './actions/Main.js'

export default class Brick extends React.Component {

  render () {
    return (
      <Provider store={this.props.store}>
        <RouterContext {...this.props.matchProps}/>
      </Provider>
    )
  }
}
