import React from 'react';
import {connect} from 'react-redux'
import {ContentRow} from './components/ContentRow.jsx'
import {CreateBrick} from './components/CreateBrick.jsx'
import {newContentSubmit} from '../actions/Topic.js';

class Topic extends React.Component {
  constructor(props){
    super(props);
    this.handle_dispatch = this.handle_dispatch.bind(this)
  }

  handle_dispatch(text, ref, containerIndex, containerRow, topicId){
    this.props.dispatch(newContentSubmit(text, ref, containerIndex, containerRow, topicId))
  }

  render(){
    console.log('enter component Topic')
    let topicId = this.props.params.topicId;
    let content = this.props.topicData[topicId];
    return(
      <section>
        <CreateBrick/>
        <ContentRow id="rowOne" rowRecord = {content.rowOne} topicId = {topicId} handle_dispatch = {this.handle_dispatch}/>
        <ContentRow id="rowTwo" rowRecord = {content.rowTwo} topicId = {topicId} handle_dispatch = {this.handle_dispatch}/>
        <ContentRow id="rowThree" rowRecord = {content.rowThree} topicId = {topicId} handle_dispatch = {this.handle_dispatch}/>
        <ContentRow id="rowFour" rowRecord = {content.rowFour} topicId = {topicId} handle_dispatch = {this.handle_dispatch}/>
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
