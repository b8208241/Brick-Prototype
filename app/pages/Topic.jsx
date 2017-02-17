import React from 'react';
import {connect} from 'react-redux'
import {ButtonTopicAndWall} from './components/ButtonTopicAndWall.jsx';
import {MemoTool} from './components/MemoTool.jsx';
import {newContentSubmit, positionChangeSubmit} from '../actions/Topic.js';

class Topic extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isShowingWall: false
    };
    this.handle_dispatch_newContentSubmit = this.handle_dispatch_newContentSubmit.bind(this);
    this.handle_dispatch_positionChangeSubmit = this.handle_dispatch_positionChangeSubmit.bind(this);
    this.handle_click_ButtonTopicAndWall = this.handle_click_ButtonTopicAndWall.bind(this);
}


  handle_click_ButtonTopicAndWall(){
    this.state.isShowingWall ? this.setState({isShowingWall: false}) : this.setState({isShowingWall: true})
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
        <section className='section-TopicWall'>
          <ButtonTopicAndWall topicData = {topicData} topicId={topicId} isShowingWall={this.state.isShowingWall} handle_click={this.handle_click_ButtonTopicAndWall} handle_dispatch_newContentSubmit={this.handle_dispatch_newContentSubmit} handle_dispatch_positionChangeSubmit={this.handle_dispatch_positionChangeSubmit}/>
          {
            !this.state.isShowingWall &&
            <MemoTool/>
          }
        </section>
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
