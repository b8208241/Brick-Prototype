import React from 'react';

export class TopicText extends React.Component {
  constructor(props){
    super(props);
  };

  render() {
    return(
      <div style={{width: '90%', marginLeft: '5%', position: 'absolute', bottom: '0px', zIndex: '1'}}>
        <div className="topic-text">
          <div className="topic-text-header">{this.props.topicText}</div>
          <div style={{width: '65%', position: 'relative', left: '10%', border: '1px solid'}}></div>
          <p>一小段主題的說明文字，需要有兩行</p>
        </div>
        <div className="topic-foundation"></div>
      </div>
    )
  }
}
