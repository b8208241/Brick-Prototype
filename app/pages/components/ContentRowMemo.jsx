import React from 'react';
import {ContentRow} from './ContentRow.jsx'
import {Memo} from './Memo.jsx'

export class ContentRowMemo extends React.Component {
  constructor(props){
    super(props);
    this.handle_dispatch_newContentSubmit = this.handle_dispatch_newContentSubmit.bind(this);
    this.handle_dispatch_positionChangeSubmit = this.handle_dispatch_positionChangeSubmit.bind(this);
  }

  handle_dispatch_newContentSubmit(text, ref, containerIndex, containerRow, topicId){
    this.props.handle_dispatch_newContentSubmit(text, ref, containerIndex, containerRow, topicId)
  }

  handle_dispatch_positionChangeSubmit(originIndex, originRow, newIndex, newRow, topicId){
    this.props.handle_dispatch_positionChangeSubmit(originIndex, originRow, newIndex, newRow, topicId)
  }

  render() {
    let topicId = this.props.topicId;
    let content = this.props.topicData[topicId];

    return(
      <div className="row-memo-container">
        <div className="row-container">
          <ContentRow id="rowTwo" class="row" rowRecord = {content[2]} topicId = {topicId} handle_dispatch_newContentSubmit = {this.handle_dispatch_newContentSubmit} handle_dispatch_positionChangeSubmit = {this.handle_dispatch_positionChangeSubmit}/>
          <ContentRow id="rowThree" class="row" rowRecord = {content[3]} topicId = {topicId} handle_dispatch_newContentSubmit = {this.handle_dispatch_newContentSubmit} handle_dispatch_positionChangeSubmit = {this.handle_dispatch_positionChangeSubmit}/>
        </div>
        <Memo/>
      </div>
    )
  }
}
