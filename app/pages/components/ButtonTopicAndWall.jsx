import React from 'react';
import {ButtonTopic} from './ButtonTopic.jsx';
import {TopicWall} from './TopicWall.jsx';

export class ButtonTopicAndWall extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let topicId = this.props.topicId;
    let topicData = this.props.topicData;
    return(
      <div>
        {
          !this.props.isShowingWall &&
          <img src="template_BrickOriginal.svg" className="button-topicwall" onClick={this.props.handle_click}/>
        }
        {
          this.props.isShowingWall &&
          <TopicWall topicData = {topicData} topicId={topicId} handle_click = {this.props.handle_click} handle_dispatch_newContentSubmit={this.props.handle_dispatch_newContentSubmit} handle_dispatch_positionChangeSubmit={this.props.handle_dispatch_positionChangeSubmit}/>
        }
        <ButtonTopic topicText={topicData[topicId].topic}/>
      </div>
    )
  }
}
