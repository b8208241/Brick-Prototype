import React from 'react';
import {connect} from 'react-redux'
import {TopicWall} from './components/TopicWall.jsx';
import {TopicText} from './components/TopicText.jsx';
import {ButtonMemo} from './components/ButtonMemo.jsx'
import {newContentSubmit, positionChangeSubmit} from '../actions/Topic.js';

class Topic extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isShowingMemo: false
    };
    this.handle_dispatch_newContentSubmit = this.handle_dispatch_newContentSubmit.bind(this);
    this.handle_dispatch_positionChangeSubmit = this.handle_dispatch_positionChangeSubmit.bind(this);
    this.handle_click_ButtonMemo = this.handle_click_ButtonMemo.bind(this);
}

  handle_click_ButtonMemo(){
    this.state.isShowingMemo ? this.setState({isShowingMemo: false}) : this.setState({isShowingMemo: true})
  }

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
        <div className='topic-wall'>
          <TopicWall topicData = {topicData} topicId={topicId} handle_dispatch_newContentSubmit={this.handle_dispatch_newContentSubmit} handle_dispatch_positionChangeSubmit={this.handle_dispatch_positionChangeSubmit}/>
        </div>
        <div style={{width: '90%', marginLeft: '5%', position: 'absolute', bottom: '0px', zIndex: '1'}}>
          <TopicText topicText={topicData[topicId].topic}/>
          <div className="topic-foundation"></div>
        </div>
        <ButtonMemo isShowingMemo = {this.state.isShowingMemo} handle_click = {this.handle_click_ButtonMemo}/>
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
