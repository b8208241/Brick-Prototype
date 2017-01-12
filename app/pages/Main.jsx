import React from 'react';
import {connect} from 'react-redux'
import {TopicRow} from './components/TopicRow.jsx'
import {NewTopicCreate} from './components/NewTopicCreate.jsx'

import {newTopicSubmit} from '../actions/Main.js';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
  };

  handleNewSubmit(inputTopic){
    this.props.dispatch(newTopicSubmit(inputTopic, this.props.userData.userName));
  }

  render() {
    console.log('enter component in Main')
    return(
      <section>
        <TopicRow topicSaved = {this.props.brickData.topicSaved}/>
        <NewTopicCreate handleNewSubmit={this.handleNewSubmit}/>
      </section>
    )
  }
}

function mapStateToProps (state) {
  return {
    token: state.token,
    brickData: state.brickData,
    userData: state.userData
  }
}

export default connect(mapStateToProps)(
  Main
)
