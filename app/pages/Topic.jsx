import React from 'react';
import {connect} from 'react-redux'
import {ContentRow} from './components/ContentRow.jsx'
import {ContentRowMemo} from './components/ContentRowMemo.jsx'
import {ManipulateRow} from './components/ManipulateRow.jsx'
import {CreateBrick} from './components/CreateBrick.jsx'
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
    console.log('enter component Topic')
    let topicId = this.props.params.topicId;
    let content = this.props.topicData[topicId];
    return(
      <section>
        <section className='section-Topic'>
          <CreateBrick/>
          <ManipulateRow handle_archive = {this.handle_archive}/>
          <ContentRow id="rowOne" class="row" rowRecord = {content[1]} topicId = {topicId} handle_dispatch_newContentSubmit = {this.handle_dispatch_newContentSubmit} handle_dispatch_positionChangeSubmit = {this.handle_dispatch_positionChangeSubmit}/>
          <ContentRowMemo topicId = {topicId} topicData = {this.props.topicData} handle_dispatch_newContentSubmit = {this.handle_dispatch_newContentSubmit} handle_dispatch_positionChangeSubmit = {this.handle_dispatch_positionChangeSubmit}/>
          <ContentRow id="rowFour" class="row" rowRecord = {content[4]} topicId = {topicId} handle_dispatch_newContentSubmit = {this.handle_dispatch_newContentSubmit} handle_dispatch_positionChangeSubmit = {this.handle_dispatch_positionChangeSubmit}/>
        </section>
        <div>
          <h3>{content.topic}</h3>
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
