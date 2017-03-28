import React from 'react';
import {StyleGroup} from './draft/StyleGroup.jsx'
import {keyBindingFn} from './draft/KeyBindingFn.js';
import {compositeDecorator} from './draft/CompositeDecorator.jsx';
import {EditorState, convertToRaw, convertFromRaw, Modifier, RichUtils} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
const linkifyPlugin = createLinkifyPlugin({
  target: '_blank'
});

export class EditBrickCol extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      subEditorState: EditorState.createEmpty(),
      contentEditorState: this.props.isEditingOld? EditorState.createWithContent(convertFromRaw(this.props.editingBrick.draftData_Content)) : EditorState.createEmpty(),
      contentEditorClass: "topic-editbrick-col-editorgroup-contentEditor",
      firstEditorExist: false
    };
    this.changeContentEditorState = (newState) => this.setState({contentEditorState: newState});
    this.changeSubEditorState = (newState) => this.setState({subEditorState: newState});
    this.handle_Click_ContentEditor = () => this.contentEditor.focus();
    this.handle_Click_BrickSubmit = this.handle_Click_BrickSubmit.bind(this);
    this.handle_KeyCommand_ContentEditor = this.handle_KeyCommand_ContentEditor.bind(this);
  }

  handle_Click_BrickSubmit(event){
    event.preventDefault();
    event.stopPropagation();
    let subEditorData = convertToRaw(this.state.subEditorState.getCurrentContent());
    let contentEditorData = convertToRaw(this.state.contentEditorState.getCurrentContent());

    this.props.handle_dispatch_EditedContentSubmit(subEditorData, contentEditorData);
  }

  handle_KeyCommand_ContentEditor(command){
    console.log('handleKeyCommand, ContentEditor')
    //RichUtils is like a library, handling most of default command used in editor, like Ctrl + B
    //It will modified the editorState naturally, and return a new editorState
    const newState = RichUtils.handleKeyCommand(this.state.contentEditorState, command);
    if(newState) {
      changeState(newState);
      return 'handled';
    };
    if(command === 'Enter Pressed in Topic Editing contentEditor'){
      this.setState({
        contentEditorClass: "topic-editbrick-col-editorgroup-contentEditor topic-editbrick-col-editorgroup-contentEditor-active",
        firstEditorExist: true
      })
      return 'handled';
    }

    return 'not-handled';
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
      contentEditorState: EditorState.createWithContent(convertFromRaw(nextProps.editingBrick.draftData_Content))
    }) : this.setState({
      contentEditorState: EditorState.createEmpty()
    })
  }

  componentWillUpdate(){
    console.log('EditBrickCol will Update')
  }

  componentDidUpdate(){
    console.log('EditBrickCol did Update')
    if(this.state.firstEditorExist){
      this.subEditor.focus();
    }
  }

  render(){
    return(
      <div className="topic-editbrick-col">
        <div className="topic-editbrick-col-editorgroup" onClick={this.handle_Click_ContentEditor}>
          <div className={this.state.contentEditorClass}>
            <Editor
              editorState={this.state.contentEditorState}
              onChange={this.changeContentEditorState}
              ref={(element) => {this.contentEditor = element;}}
              plugins={[linkifyPlugin]}
              keyBindingFn={keyBindingFn.for_Topic_Editing_ContentEditor}
              handleKeyCommand={this.handle_KeyCommand_ContentEditor}
              />
          </div>
          {
            this.state.firstEditorExist &&
            <div className="topic-editbrick-col-editorgroup-subEditor">
              <Editor
                editorState={this.state.subEditorState}
                onChange={this.changeSubEditorState}
                ref={(element) => {this.subEditor = element;}}
                plugins={[linkifyPlugin]}
                />
            </div>
          }
          <StyleGroup
            editorState={this.state.contentEditorState}
            onChange={this.changeContentEditorState}/>
        </div>
        <input
          value="save"
          className="topic-editbrick-col-input-save"
          onClick={this.handle_Click_BrickSubmit}
          readOnly
        />
      </div>
    )
  }
}
