import React from 'react';
// import {Editor, EditorState, convertFromRaw} from 'draft-js';

export class TopicLogItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(this.props.logItemData))
    };
    this.changeEditorState = () => {}
  }

  render(){
    return(
      <Editor
        editorState={this.state.editorState}
        onChange={this.changeEditorState}
        readOnly/>
    )
  }
}
