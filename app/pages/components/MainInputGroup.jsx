import React from 'react';
import {ActiveTopicRow} from './ActiveTopicRow.jsx'
import {NewTopicCreate} from './NewTopicCreate.jsx'
import {ContentsBucket} from './ContentsBucket.jsx'

export class MainInputGroup extends React.Component {
  constructor(props){
    super(props);
    this.handle_NewSubmit = this.handle_NewSubmit.bind(this);
    this.open_ActiveTopic = this.open_ActiveTopic.bind(this);
    this.open_ContentsBucket = this.open_ContentsBucket.bind(this);
  };

  handle_NewSubmit(inputTopic){
    this.props.handle_NewSubmit(inputTopic);
  }

  open_ActiveTopic(){
    console.log('enter open_ActiveTopic')
    $('#block_ActiveTopic').toggle();
  }

  open_ContentsBucket(){
    console.log('enter open_ContentsBucket')
    $('#block_ContentsBucket').toggle();
  }

  render() {
    return(
      <div>
        <span onClick={this.open_ContentsBucket}>收集籃</span>
        <span onClick={this.open_ActiveTopic}>active</span>
        <div id='block_ActiveTopic' className="block">
          <ActiveTopicRow activeTopicRow = {this.props.topicData.activeTopicRow}/>
          <NewTopicCreate handle_NewSubmit = {this.handle_NewSubmit}/>
        </div>
        <div id='block_ContentsBucket' className="block">
          <ContentsBucket contentsBucket = {this.props.contentsBucket}/>
        </div>
      </div>
    )
  }
}
