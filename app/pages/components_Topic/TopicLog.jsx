import React from 'react';
import {TopicLogItem} from './TopicLogItem.jsx';

export class TopicLog extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    let list = this.props.logData.map(
      function(obj, index){
        return (
          <li key={"key_logItem"+index+"_"+obj.creatingTime}>
            <TopicLogItem
              logItemData = {obj.draftData}/>
            <div>{obj.creatingTime}</div>
          </li>
        )
      }
    )
    return(
      <ul className="topic-topview-topiclog">
        {list}
      </ul>
    )
  }
}
