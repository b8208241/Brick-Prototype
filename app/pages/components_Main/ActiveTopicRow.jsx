import React from 'react';
import { Link } from 'react-router'

export class ActiveTopicRow extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  };

  render() {
    console.log('enter component in Main: ActiveTopicRow')
    let activeTopicRowBricks = this.props.activeTopicRow.map(
      function(obj){
          return <ActiveTopicRowBrick key={obj.topicId} id={obj.topicId} topic={obj.topic} url={obj.url}/>;
      }
    );
    return(
      <ol className="main-top-activetopics">
        {activeTopicRowBricks}
      </ol>
    )
  }
}

class ActiveTopicRowBrick extends React.Component {
  render() {
    return(
      <li className="main-top-activetopics-item" id={this.props.id}><Link to={this.props.url}>{this.props.topic}</Link></li>
    )
  }
}
