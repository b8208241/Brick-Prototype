import React from 'react';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw} from 'draft-js';
//let [Editor, EditorState] = [null,null]

export class DraftEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editorState: this.props.contentState? EditorState.createWithContent(this.props.contentState) : EditorState.createEmpty(this.props.compositeDecorator)
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
    if(command === "Enter Pressed in ContentCreate"){
        this.props.handle_keycommand_ContentCreate();
        this.changeEditorState(EditorState.createEmpty());
        return 'handled';
      }
    return 'not-handled';
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    if(this.props.focusState){
      console.log('DraftEditor did Update, focusState true')
      this.refs.editor.focus()
    }
  }

  render(){
    console.log('enter DraftEditor')
    console.log(this.state.editorState)
    return(
      <Editor
        editorState={this.state.editorState}
        onChange={this.changeEditorState}
        ref="editor"
        keyBindingFn={this.props.keyBindingFn}
        handleKeyCommand={this.handle_KeyCommand}
        />
    )
  }
}
