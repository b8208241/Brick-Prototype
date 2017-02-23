import React from 'react';
import {ContentRow} from './ContentRow.jsx'
import {ContentShow} from './ContentShow.jsx'

export class TopicWall extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isShowingContent: false,
      rowShowing: null,
      indexShowing: null
    }
    this.handle_Click_Brick = this.handle_Click_Brick.bind(this);
  }

  handle_Click_Brick(brickIndex, brickRow){
    this.state.isShowingContent ? this.setState({isShowingContent: false, rowShowing: null, indexShowing: null}) : this.setState({isShowingContent: true, rowShowing: brickRow, indexShowing: brickIndex});
  }


  render() {
    console.log('enter TopicWall')
    let topicId = this.props.topicId;
    let topicThis = this.props.topicData[topicId];
    let rowShowing = this.state.rowShowing;
    let indexShowing = this.state.indexShowing;

    return(
      <div className='topic-wall'>
        {
          !this.state.isShowingContent &&
          <div>
            <ContentRow id="rowOne" class="row" rowRecord = {topicThis[1]} topicId = {topicId} handle_Click_Brick = {this.handle_Click_Brick} handle_dispatch_positionChangeSubmit = {this.props.handle_dispatch_positionChangeSubmit}/>
            <ContentRow id="rowTwo" class="row" rowRecord = {topicThis[2]} topicId = {topicId} handle_Click_Brick = {this.handle_Click_Brick} handle_dispatch_positionChangeSubmit = {this.props.handle_dispatch_positionChangeSubmit}/>
            <ContentRow id="rowThree" class="row" rowRecord = {topicThis[3]} topicId = {topicId} handle_Click_Brick = {this.handle_Click_Brick} handle_dispatch_positionChangeSubmit = {this.props.handle_dispatch_positionChangeSubmit}/>
            <ContentRow id="rowFour" class="rowFour" rowRecord = {topicThis[4]} topicId = {topicId} handle_Click_Brick = {this.handle_Click_Brick} handle_dispatch_positionChangeSubmit = {this.props.handle_dispatch_positionChangeSubmit}/>
          </div>
        }
        {
          this.state.isShowingContent &&
          <div>
            <ContentRow class="row" rowRecord = {topicThis[rowShowing]} topicId = {topicId} handle_Click_Brick = {this.handle_Click_Brick} handle_dispatch_positionChangeSubmit = {this.props.handle_dispatch_positionChangeSubmit}/>
            <ContentShow indexShowing = {indexShowing}  rowRecord = {topicThis[rowShowing]}/>
          </div>
        }
      </div>
    )
  }
}
