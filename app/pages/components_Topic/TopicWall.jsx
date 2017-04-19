import React from 'react';
import {ContentRow} from './ContentRow.jsx'
import {ContentRowTwo} from './ContentRowTwo.jsx'

export class TopicWall extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }

  componentWillReceiveProps(){

  }

  componentDidUpdate(){

  }

  render() {
    console.log('enter TopicWall')
    let topicId = this.props.topicId;
    let topicThis = this.props.topicData[topicId];
    let topicText = topicThis["topic"]

    return(
      <div className='topic-wall'>
        <ContentRow
          class="topic-wall-row"
          rowRecord = {topicThis[1]}
          topicId = {topicId}
          editingStatus={this.props.editingStatus}
          editingPosition={ 1===this.props.editingPosition[0] ? this.props.editingPosition : false}
          editingBrickIndex = { 1===this.props.editingBrickRow ? this.props.editingBrickIndex+1 : false}
          searchResult = {this.props.searchResult ? this.props.searchResult[0] : false}
          open_EditCol = {this.props.open_EditCol}
          handle_Drop_CellFocus = {this.props.handle_Drop_CellFocus}
          handle_dispatch_positionChangeSubmit = {this.props.handle_dispatch_positionChangeSubmit}
          handle_dispatch_RecycleBrickSubmit={this.props.handle_dispatch_RecycleBrickSubmit}/>
        <ContentRowTwo
          class="topic-wall-row"
          topicThis = {topicThis}
          rowRecord = {topicThis[2]}
          topicId = {topicId}
          topicText = {topicText}
          editingStatus={this.props.editingStatus}
          editingPosition={ 2===this.props.editingPosition[0] ? this.props.editingPosition : false}
          editingBrickIndex = { 2===this.props.editingBrickRow ? this.props.editingBrickIndex+1 : false}
          searchResult = {this.props.searchResult ? this.props.searchResult[1] : false}
          open_EditCol = {this.props.open_EditCol}
          search_SubTopic={this.props.search_SubTopic}
          handle_Drop_CellFocus = {this.props.handle_Drop_CellFocus}
          handle_dispatch_positionChangeSubmit = {this.props.handle_dispatch_positionChangeSubmit}
          handle_dispatch_RecycleBrickSubmit={this.props.handle_dispatch_RecycleBrickSubmit}/>
        <ContentRow
          class="topic-wall-row"
          rowRecord = {topicThis[3]}
          topicId = {topicId}
          editingStatus={this.props.editingStatus}
          editingPosition={ 3===this.props.editingPosition[0] ? this.props.editingPosition : false}
          editingBrickIndex = { 3===this.props.editingBrickRow ? this.props.editingBrickIndex+1 : false}
          searchResult = {this.props.searchResult ? this.props.searchResult[2] : false}
          open_EditCol = {this.props.open_EditCol}
          handle_Drop_CellFocus = {this.props.handle_Drop_CellFocus}
          handle_dispatch_positionChangeSubmit = {this.props.handle_dispatch_positionChangeSubmit}
          handle_dispatch_RecycleBrickSubmit={this.props.handle_dispatch_RecycleBrickSubmit}/>
        <ContentRow
          class="topic-wall-row"
          rowRecord = {topicThis[4]}
          topicId = {topicId}
          editingStatus={this.props.editingStatus}
          editingPosition={ 4===this.props.editingPosition[0] ? this.props.editingPosition : false}
          editingBrickIndex = { 4===this.props.editingBrickRow ? this.props.editingBrickIndex+1 : false}
          searchResult = {this.props.searchResult ? this.props.searchResult[3] : false}
          open_EditCol = {this.props.open_EditCol}
          handle_Drop_CellFocus = {this.props.handle_Drop_CellFocus}
          handle_dispatch_positionChangeSubmit = {this.props.handle_dispatch_positionChangeSubmit}
          handle_dispatch_RecycleBrickSubmit={this.props.handle_dispatch_RecycleBrickSubmit}/>
      </div>
    )
  }
}
