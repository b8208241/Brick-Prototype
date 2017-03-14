import React from 'react';

export class TopicManipulate extends React.Component {
  constructor(props){
    super(props);
  };

  render() {
    return(
      <div style={{width: '90%', height:'10%', marginLeft: '5%'}}>
        <span style={{marginLeft: '3%', fontSize:"1.8em", fontFamily: 'Gotham, "Helvetica Neue", Helvetica'}} onClick={this.props.handle_Click_Edit}> EDIT</span>
        <div className="topic-foundation"></div>
      </div>
    )
  }
}
