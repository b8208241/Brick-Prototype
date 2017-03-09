import React from 'react';
import {DraftEditor} from './DraftEditor.jsx';
import {keyBindingFn} from './DraftKeyBindingFn.js';
import {convertToRaw, convertFromRaw} from 'draft-js';

export class TopicNewEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newEditTopic: null,
      newEditText: null
    };
    this.handle_Click = this.handle_Click.bind(this);
    this.updateTopicState = (newState) => this.setState({newEditTopic: newState});
    this.updateTextState = (newState) => this.setState({newEditText: newState});
  };

  handle_Click(){
    console.log('TopicNewEdit, handle Cut')
    let newEditTopicData = convertToRaw(this.state.newEditTopic.getCurrentContent());
    let newEditTextData = convertToRaw(this.state.newEditText.getCurrentContent());
    this.props.handle_dispatch_newBrickSubmit(newEditTopicData, newEditTextData);
  }

  render(){
    return(
      <div className="topic-newedit">
        <DraftEditor returnState={true} keyBindingFn={keyBindingFn.for_Topic_NewEdit} updateEditorState={this.updateTopicState}/>
        <DraftEditor returnState={true} keyBindingFn={keyBindingFn.for_Topic_NewEdit} updateEditorState={this.updateTextState}/>
        <div className="" onClick={this.handle_Click}>Cut</div>
      </div>
    )
  }
}
