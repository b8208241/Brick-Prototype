import React from 'react';
import {ContentRow} from './ContentRow.jsx'

export class TopicWall extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    console.log('enter TopicWall')
    let topicId = this.props.topicId;
    let topicThis = this.props.topicData[topicId];

    return(
      <div className='topic-wall'>
          <ContentRow id="rowOne" class="row-one" rowRecord = {topicThis[1]} topicId = {topicId} handle_dispatch_positionChangeSubmit = {this.props.handle_dispatch_positionChangeSubmit} handle_Click_Brick = {this.props.handle_Click_Brick} handle_Click_CellDefault={this.props.handle_Click_CellDefault}/>
          <ContentRow id="rowTwo" class="row" rowRecord = {topicThis[2]} topicId = {topicId} handle_dispatch_positionChangeSubmit = {this.props.handle_dispatch_positionChangeSubmit} handle_Click_Brick = {this.props.handle_Click_Brick} handle_Click_CellDefault={this.props.handle_Click_CellDefault}/>
          <ContentRow id="rowThree" class="row" rowRecord = {topicThis[3]} topicId = {topicId} handle_dispatch_positionChangeSubmit = {this.props.handle_dispatch_positionChangeSubmit} handle_Click_Brick = {this.props.handle_Click_Brick} handle_Click_CellDefault={this.props.handle_Click_CellDefault}/>
          <ContentRow id="rowFour" class="row" rowRecord = {topicThis[4]} topicId = {topicId} handle_dispatch_positionChangeSubmit = {this.props.handle_dispatch_positionChangeSubmit} handle_Click_Brick = {this.props.handle_Click_Brick} handle_Click_CellDefault={this.props.handle_Click_CellDefault}/>
      </div>
    )
  }
}
