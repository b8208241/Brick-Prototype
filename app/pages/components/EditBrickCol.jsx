import React from 'react';
import {StyleGroup} from './draft/StyleGroup.jsx'
import {keyBindingFn} from './draft/KeyBindingFn.js';
import {handleKeyCommand_TagEditor, handleKeyCommand_ContentEditor} from './draft/handleKeyCommand.js'
import {compositeDecorator} from './draft/CompositeDecorator.jsx';
import {EditorState, convertToRaw, convertFromRaw, Modifier} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
const linkifyPlugin = createLinkifyPlugin({
  target: '_blank'
});

export class EditBrickCol extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tagEditorState: this.props.isEditingOld? EditorState.createWithContent(convertFromRaw(this.props.editingBrick.draftData_Tag)) : EditorState.createEmpty(),
      contentEditorState: this.props.isEditingOld? EditorState.createWithContent(convertFromRaw(this.props.editingBrick.draftData_Content)) : EditorState.createEmpty()
    };
    this.changeTagEditorState = (newState) => this.setState({tagEditorState: newState});
    this.changeContentEditorState = (newState) => this.setState({contentEditorState: newState});
    this.handle_Click_BrickSubmit = this.handle_Click_BrickSubmit.bind(this);
    this.handle_Click_TagEditor = this.handle_Click_TagEditor.bind(this);
    this.handle_Click_ContentEditor = () => this.contentEditor.focus();
    this.handle_KeyCommand_TagEditor = (command) => handleKeyCommand_TagEditor(command, this.state.tagEditorState, this.changeTagEditorState);
    this.handle_KeyCommand_ContentEditor = (command) => handleKeyCommand_ContentEditor(command, this.state.contentEditorState, this.changeTagEditorState);
  }

  handle_Click_BrickSubmit(event){
    event.preventDefault();
    event.stopPropagation();
    let tagEditorData = convertToRaw(this.state.tagEditorState.getCurrentContent());
    let contentEditorData = convertToRaw(this.state.contentEditorState.getCurrentContent());

    this.props.handle_dispatch_EditedContentSubmit(tagEditorData, contentEditorData);
  }

  handle_Click_TagEditor(event){
    event.preventDefault();
    event.stopPropagation();

    this.refs.tagEditor.focus();
    const currentContentState = this.state.tagEditorState.getCurrentContent();
    const selection = this.state.tagEditorState.getSelection();
    const modifiedContentState = Modifier.insertText(currentContentState, selection, "#");
    this.changeTagEditorState(
      EditorState.moveFocusToEnd(
        EditorState.push(
          this.state.tagEditorState,
          modifiedContentState,
          'insert-text'
        )
      )
    );
  }

  componentWillMount(){
    console.log('componentWillMount')
  }

  componentDidMount(){
    //focus on contentEditor after componentDidMount will block the linkifyPlugin function
    //this.contentEditor.focus();
  }

  componentWillReceiveProps(nextProps){
    console.log('EditBrickCol will Receive Props')
    nextProps.isEditingOld ?　
    this.setState({
      tagEditorState: EditorState.createWithContent(convertFromRaw(nextProps.editingBrick.draftData_Tag)),
      contentEditorState: EditorState.createWithContent(convertFromRaw(nextProps.editingBrick.draftData_Content))
    }) : this.setState({
      tagEditorState: EditorState.createEmpty(),
      contentEditorState: EditorState.createEmpty()
    })
  }

  componentWillUpdate(){
    console.log('EditBrickCol will Update')
  }

  componentDidUpdate(){
    console.log('EditBrickCol did Update')
  }

  render(){
    return(
      <div className="topic-edit-brickcol">
        <div className="topic-edit-brickcol-tageditor" onClick={this.handle_Click_TagEditor}>
          <Editor
            editorState={this.state.tagEditorState}
            onChange={this.changeTagEditorState}
            ref="tagEditor"
            placeholder="#..."
            keyBindingFn={keyBindingFn.for_Topic_Editing_TagEditor}
            handleKeyCommand={this.handle_KeyCommand_TagEditor}
            />
        </div>
        <div style={{marginLeft: '6%'}}>
          "#推薦tag 1 #推薦tag 2 #推薦tag 3"
        </div>
        <div className="topic-edit-brickcol-contentEditor" onClick={this.handle_Click_ContentEditor}>
          <StyleGroup
            editorState={this.state.contentEditorState}
            onChange={this.changeContentEditorState}/>
          <Editor
            editorState={this.state.contentEditorState}
            onChange={this.changeContentEditorState}
            ref={(element) => {this.contentEditor = element;}}
            plugins={[linkifyPlugin]}
            keyBindingFn={keyBindingFn.for_Topic_Editing_ContentEditor}
            handleKeyCommand={this.handle_KeyCommand_ContentEditor}
            />
        </div>
        <input
          value="save"
          className="topic-edit-brickcol-input-save"
          onClick={this.handle_Click_BrickSubmit}
          readOnly
        />
      </div>
    )
  }
}
