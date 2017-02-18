import React from 'react';
import {connect} from 'react-redux'
import { Route } from 'react-router'
import {MainInputGroup} from './components/MainInputGroup.jsx'
import {SelfNav} from './components/SelfNav.jsx'

import {newTopicSubmit} from '../actions/Main.js';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.handle_NewSubmit = this.handle_NewSubmit.bind(this);
  };

  handle_NewSubmit(inputTopic){
    this.props.dispatch(newTopicSubmit(inputTopic, this.props.userData.userName));
  }

  render() {
    console.log('enter component in Main')
    let userData = this.props.userData
    let children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(
        child,
        {
          userData: userData
        })
    })
    return(
      <section>
        <section className='section-Main'>
          <h4>{this.props.userData.userName}</h4>
          <h1>Brick</h1>
          <MainInputGroup contentsBucket={this.props.contentsBucket} topicData={this.props.topicData} handle_NewSubmit={this.handle_NewSubmit}/>
        </section>
        <section className='section-Self'>
          <SelfNav/>
          {children}
        </section>
      </section>
    )
  }
}

function mapStateToProps (state) {
  return {
    token: state.token,
    topicData: state.topicData,
    userData: state.userData,
    contentsBucket: state.contentsBucket
  }
}

export default connect(mapStateToProps)(
  Main
)
