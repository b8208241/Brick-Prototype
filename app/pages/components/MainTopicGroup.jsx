import React from 'react';
import {ActiveTopicRow} from './ActiveTopicRow.jsx'
import {NewTopicCreate} from './NewTopicCreate.jsx'

export class MainTopicGroup extends React.Component {
  constructor(props){
    super(props);
    this.handle_NewSubmit = this.handle_NewSubmit.bind(this);
  };

  handle_NewSubmit(inputTopic){
    this.props.handle_NewSubmit(inputTopic);
  }

  render() {
    return(
        <div id='block_ActiveTopic' className="block">
          <ActiveTopicRow activeTopicRow = {this.props.topicData.activeTopicRow}/>
          <NewTopicCreate handle_NewSubmit = {this.handle_NewSubmit}/>
        </div>
    )
  }
}
