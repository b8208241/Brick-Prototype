import React from 'react';
import {DraftEditor} from './draft/DraftEditor.jsx';
import {keyBindingFn} from './draft/KeyBindingFn.js';
import {convertToRaw, convertFromRaw} from 'draft-js';

export class ContentShow extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      brickTopicState: null,
      brickTextState: null,
    }
    this.handle_Click = this.handle_Click.bind(this);
    this.updateBrickTopicState = (newState) => this.setState({brickTopicState: newState});
    this.updateBrickTextState = (newState) => this.setState({brickTextState: newState});
  }

  handle_Click(){
    console.log('contentShow, handle Save')
    let brickTopicData = convertToRaw(this.state.brickTopicState.getCurrentContent());
    let brickTextData = convertToRaw(this.state.brickTextState.getCurrentContent());
    this.props.handle_dispatch_brickContentSubmit(brickTopicData, brickTextData, this.props.rowShowing, this.props.indexShowing, this.props.brickRecord);
  }

  render() {
    console.log('enter ContentShow')
    let [brickTopicData, brickTextData] = [false, false]
    if(this.props.brickRecord.class === "cell"){
      brickTopicData = convertFromRaw(this.props.brickRecord.draftBrickTopicData);
      brickTextData = convertFromRaw(this.props.brickRecord.draftBrickTextData);
    }

    return(
      <div className="topic-wall-showing">
        <div className="topic-wall-showing-topiceditor">
          <DraftEditor contentState={brickTopicData} returnState={true} keyBindingFn={keyBindingFn.for_ContentShowing_BrickTopic} updateEditorState={this.updateBrickTopicState}/>
        </div>
        <div className="topic-wall-showing-texteditor">
          <DraftEditor contentState={brickTextData} returnState={true} keyBindingFn={keyBindingFn.for_ContentShowing_BrickText} updateEditorState={this.updateBrickTextState}/>
        </div>
        <div className="topic-wall-showing-bar" onClick={this.handle_Click}>Save</div>
      </div>
    )
  }
}
