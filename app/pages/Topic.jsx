import React from 'react';
import {connect} from 'react-redux'
import {TopicWall} from './components/TopicWall.jsx';
import {TopicCollect} from './components/TopicCollect.jsx';
import {ManipulateRow} from './components/ManipulateRow.jsx';
import {newContentSubmit, positionChangeSubmit} from '../actions/Topic.js';

class Topic extends React.Component {
  constructor(props){
    super(props);
    this.handle_dispatch_newContentSubmit = this.handle_dispatch_newContentSubmit.bind(this);
    this.handle_dispatch_positionChangeSubmit = this.handle_dispatch_positionChangeSubmit.bind(this);
    this.handle_archive = this.handle_archive.bind(this);
  }

  handle_archive(){}

  handle_dispatch_newContentSubmit(text, ref, containerIndex, containerRow, topicId){
    this.props.dispatch(newContentSubmit(text, ref, containerIndex, containerRow, topicId))
  }

  handle_dispatch_positionChangeSubmit(originIndex, originRow, newIndex, newRow, topicId){
    this.props.dispatch(positionChangeSubmit(originIndex, originRow, newIndex, newRow, topicId))
  }

  render(){
    console.log('enter page Topic')
    let topicId = this.props.params.topicId;
    let topicData = this.props.topicData;
    return(
      <section>
        <section className='section-TopicWall'>
          <TopicWall topicData = {topicData} topicId={topicId} handle_dispatch_newContentSubmit={this.handle_dispatch_newContentSubmit} handle_dispatch_positionChangeSubmit={this.handle_dispatch_positionChangeSubmit}/>
          <TopicCollect/>
        </section>
        <div>
          <ManipulateRow handle_archive = {this.handle_archive}/>
        </div>
      </section>
    )
  }
}

function mapStateToProps (state) {
  return {
    token: state.token,
    topicData: state.topicData,
    userData: state.userData
  }
}

export default connect(mapStateToProps)(
  Topic
)
