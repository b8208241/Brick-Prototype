import React from 'react';
import {connect} from 'react-redux'
import {TopicWall} from './components/TopicWall.jsx';
import {TopicText} from './components/TopicText.jsx';
import {ButtonMemo} from './components/ButtonMemo.jsx'
import {positionChangeSubmit, newMemoSubmit} from '../actions/Topic.js';

class Topic extends React.Component {
  constructor(props){
    super(props);
    this.topicId = this.props.params.topicId;
    this.handle_dispatch_newMemoSubmit = this.handle_dispatch_newMemoSubmit.bind(this);
    this.handle_dispatch_positionChangeSubmit = this.handle_dispatch_positionChangeSubmit.bind(this);
  }

  handle_dispatch_newMemoSubmit(text, ref){
    this.props.dispatch(newMemoSubmit(text, ref, this.topicId))
  }

  handle_dispatch_positionChangeSubmit(originIndex, originRow, newIndex, newRow){
    this.props.dispatch(positionChangeSubmit(originIndex, originRow, newIndex, newRow, this.topicId))
  }

  render(){
    console.log('enter page Topic')
    let topicData = this.props.topicData;
    return(
      <section>
        <TopicWall topicData = {topicData} topicId={this.topicId} handle_dispatch_positionChangeSubmit={this.handle_dispatch_positionChangeSubmit}/>
        <TopicText topicText={topicData[this.topicId].topic}/>
        <ButtonMemo memoRecords={topicData[this.topicId].memoRecords} handle_dispatch_newMemoSubmit = {this.handle_dispatch_newMemoSubmit}/>
      </section>
    )
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
  Topic
)
