import React from 'react';

export class NewTopicCreate extends React.Component {
  constructor(props){
    super(props);
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
  }

  handleNewSubmit(){
    this.props.handleNewSubmit(this.inputTopic.value);
  }

  render() {
    return(
      <div className="topic-New">
      <input
        type="text"
        ref={(input) => this.inputTopic = input}
      />
      <input
        type="submit"
        value="新增"
        onClick={this.handleNewSubmit}
      />
      </div>
    )
  }
}
