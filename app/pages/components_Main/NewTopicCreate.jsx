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
      <div className="main-top-topicinputgroup">
        <input
          type="text"
          ref={(input) => this.inputTopic = input}
          className="main-top-topicinputgroup-text"
        />
      <span
          className="main-top-topicinputgroup-submit"
          onClick={this.handle_NewSubmit}
      >建立</span>
      </div>
    )
  }
}
