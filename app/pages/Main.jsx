import React from 'react';
import {connect} from 'react-redux'
import { Route } from 'react-router'
import {ActiveTopicRow} from './components/ActiveTopicRow.jsx'
import {NewTopicCreate} from './components/NewTopicCreate.jsx'

import {newTopicSubmit} from '../actions/Main.js';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.handle_dispatch_NewTopicSubmit = (inputTopic) => this.props.dispatch(newTopicSubmit(inputTopic, this.props.userData.userName));
  };

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
      <section style={{width: '100%', height: '100%', fontSize: '18pt'}}>
        <section className="main-top">
          <div className="main-top-logogroup">
            <div className="main-top-logogroup-logo">WallScape</div>
            <div className="main-top-logogroup-username">{this.props.userData.userName}</div>
          </div>
          <NewTopicCreate handle_NewSubmit = {this.handle_dispatch_NewTopicSubmit}/>
          <ActiveTopicRow activeTopicRow = {this.props.topicData.activeTopicRow}/>
        </section>
      </section>
    )
    //section not used, remain for demonstrating the usage of children, and illustrating the original design
    //SelfNav was deleted in later version, find in prototype-12-16 or online commit
    /*<section className='section-Self'>
      <SelfNav/>
      {children}
    </section>*/
  }
}

function mapStateToProps (state) {
  return {
    token: state.others.token,
    topicData: state.topicData,
    userData: state.others.userData
  }
}

export default connect(mapStateToProps)(
  Main
)
