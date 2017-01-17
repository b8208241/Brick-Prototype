import React from 'react';
import { Link } from 'react-router'

export class TopicRow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topicRow: this.props.topicRow
    };
  };

  render() {
    console.log('enter component in Main: TopicRow')
    let topicRowBricks = this.state.topicRow.map(
      function(obj){
          return <TopicRowBrick key={obj.topicId} id={obj.id} topic={obj.topic} url={obj.url}/>;
      }
    );
    return(
      <ol className="topic-Row">
        {topicRowBricks}
      </ol>
    )
  }
}

class TopicRowBrick extends React.Component {
  render() {
    return(
      <li className="topic-Row-Brick" id={this.props.id}><Link to={this.props.url}>{this.props.topic}</Link></li>
    )
  }
}
