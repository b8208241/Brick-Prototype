import React from 'react';
import {ModalBox} from '../components_General/ModalBox.jsx';
import {EditLogCol} from './EditLogCol.jsx';

export class BlockTopic extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      logEditing: false,
    };
    this.handle_Click_TopicText = this.handle_Click_TopicText.bind(this);
    this.handle_Click_Log =  () => {this.state.logEditing? this.setState({logEditing: false}) : this.setState({logEditing: true})};
  }

  handle_Click_TopicText(event){
    event.preventDefault();
    event.stopPropagation();
    this.props.topicStatus==='isTop'? this.props.close_TopView() : this.props.back_Top()
  }

  render(){
    return(
      <div className='topic-wall-row-block-topic' style={this.props.topicStatus==='isTop'?{zIndex: '6'}:{zIndex: '0'}}>
        <div
          className="topic-wall-row-block-topic-text"
          onClick={this.handle_Click_TopicText}>
          {this.props.topicText}
        </div>
        {
          !this.props.topicStatus &&
          <span onClick={this.handle_Click_Log}>
            Log
            {
              this.state.logEditing &&
              <ModalBox>
                <EditLogCol
                  logData = {this.props.logData}
                  handle_dispatch_LogSubmit={this.props.handle_dispatch_LogSubmit}/>
              </ModalBox>
            }
          </span>
        }
      </div>
    )
  }
}
