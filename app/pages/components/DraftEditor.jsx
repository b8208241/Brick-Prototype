import React from 'react';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw} from 'draft-js';
//let [Editor, EditorState] = [null,null]

export class DraftEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editorState: this.props.contentState? EditorState.createWithContent(this.props.contentState) : EditorState.createEmpty()
    };
    this.changeEditorState = this.changeEditorState.bind(this);
    this.handle_KeyCommand = this.handle_KeyCommand.bind(this);
  }

  changeEditorState(newState) {
    this.setState({editorState: newState});
    if(this.props.returnState){
      this.props.updateEditorState(newState);
    }
  }

  handle_KeyCommand(command){
    //RichUtils is like a library, handling most of default command used in editor, like Ctrl + B
    //It will modified the editorState naturally, and return a new editorState
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

    if(newState) {
      this.changeEditorState(newState);
      return 'handled';
    };
    if(command === 'Enter Press in Memo'){
      let contentState = this.state.editorState.getCurrentContent();
      let firstBlock = contentState.getFirstBlock();
      let rawData = convertToRaw(contentState);
      console.log(contentState)
      console.log(rawData)
      console.log(convertFromRaw(rawData))
      this.props.handle_dispatch_newMemoSubmit(firstBlock.getText());
      return 'handled';
    }

    return 'not-handled';
  }

  componentWillMount() {

  }

  componentWillUpdate() {

  }

  render(){
    console.log('enter DraftEditor')
    return(
      <Editor
        editorState={this.state.editorState}
        onChange={this.changeEditorState}
        keyBindingFn={this.props.keyBindingFn}
        handleKeyCommand={this.handle_KeyCommand}
        />
    )
  }
}
