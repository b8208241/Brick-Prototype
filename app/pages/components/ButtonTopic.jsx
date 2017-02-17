import React from 'react';
import {ModalContainer} from './ModalContainer.jsx';
import {MemoTool} from './MemoTool.jsx';

export class ButtonTopic extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isShowingModal: false
    };
    this.handle_click = this.handle_click.bind(this);
  };

  handle_click(){
    this.state.isShowingModal ? this.setState({isShowingModal: false}) : this.setState({isShowingModal: true})
  }

  render() {
    return(
      <div className="topic">
        <h3 onClick={this.handle_click}>{this.props.topicText}</h3>
        {
          this.state.isShowingModal &&
          <ModalContainer>
            <MemoTool/>
          </ModalContainer>
        }
      </div>
    )
  }
}
