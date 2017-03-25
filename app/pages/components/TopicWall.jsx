import React from 'react';
import {ContentRow} from './ContentRow.jsx'

export class TopicWall extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
    this.keyCount = 0;
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
    let children = [];
    let i
    for(i=1 ; i<5 ; i++){
      children.push(
        <ContentRow
          key= {"row_"+ this.keyCount}
          class={ i===1 ? "row-one" : "row"}
          rowRecord = {topicThis[i]}
          topicId = {topicId}
          editingBrickIndex = { i===this.props.editingBrickRow ? this.props.editingBrickIndex+1 : false}
          handle_dispatch_positionChangeSubmit = {this.props.handle_dispatch_positionChangeSubmit}
          handle_Click_Brick = {this.props.handle_Click_Brick}
          handle_Click_BrickEdit={this.props.handle_Click_BrickEdit}
          handle_dispatch_RecycleBrickSubmit={this.props.handle_dispatch_RecycleBrickSubmit}/>
      )
      this.keyCount = this.keyCount+1;
    }

    return(
      <div className='topic-wall'>
        {children}
      </div>
    )
  }
}
