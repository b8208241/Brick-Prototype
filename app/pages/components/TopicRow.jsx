import React from 'react';
import { Link } from 'react-router'

export class TopicRow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topicSaved: this.props.topicSaved
    };
  };

  render() {
    console.log('enter component in Main: TopicRow')
    let topicBricks = this.state.topicSaved.map(
      function(obj){
          return <TopicSavedBrick key={obj.topicId} id={obj.id} topic={obj.topic} url={obj.url}/>;
      }
    );
    return(
      <ol className="topic-Row">
        {topicBricks}
      </ol>
    )
  }
}

class TopicSavedBrick extends React.Component {
  render() {
    return(
      <li className="topic-Row-Brick" id={this.props.id}><Link to={this.props.url}>{this.props.topic}</Link></li>
    )
  }
}
