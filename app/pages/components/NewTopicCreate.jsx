import React from 'react';

export class NewTopicCreate extends React.Component {
  constructor(props){
    super(props);
    this.handle_NewSubmit = this.handle_NewSubmit.bind(this);
  }

  handle_NewSubmit(){
    this.props.handle_NewSubmit(this.inputTopic.value);
    this.inputTopic.value = null;
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
        onClick={this.handle_NewSubmit}
      />
      </div>
    )
  }
}
