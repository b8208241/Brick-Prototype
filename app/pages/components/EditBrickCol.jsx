import React from 'react';
import {keyBindingFn} from './draft/KeyBindingFn.js';
import {compositeDecorator} from './draft/CompositeDecorator.jsx';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw} from 'draft-js';

export class EditBrickCol extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tagEditorState: this.brickTagData? EditorState.createWithContent(this.brickTagData) : EditorState.createEmpty(compositeDecorator.tagEditor),
      contentEditorState: this.brickContentData? EditorState.createWithContent(this.brickContentData) : EditorState.createEmpty()
    };
    this.handle_Click_BrickSubmit = this.handle_Click_BrickSubmit.bind(this);
    this.changeTagEditorState = (newState) => this.setState({tagEditorState: newState});
    this.changeContentEditorState = (newState) => this.setState({contentEditorState: newState});
    this.handle_Click_ContentEditor = () => this.refs.contentEditor.focus();
    this.handle_Click_TagEditor = () => this.refs.tagEditor.focus();
  }

  handle_Click_BrickSubmit(event){
    event.preventDefault();
    event.stopPropagation();

    let tagEditorData = convertToRaw(this.state.tagEditorState.getCurrentContent());
    let contentEditorData = convertToRaw(this.state.contentEditorState.getCurrentContent());
    this.props.handle_dispatch_EditedBrickSubmit(tagEditorData, contentEditorData);
  }

  componentWillMount(){
    console.log('componentWillMount')
    this.brickTagData = false;
    this.brickContentData = false;
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
            keyBindingFn={keyBindingFn.default}
            />
        </div>
        <div style={{marginLeft: '6%'}}>
          #...推薦hashtag
        </div>
        <div className="topic-edit-brickcol-contentEditor" onClick={this.handle_Click_ContentEditor}>
          <Editor
            editorState={this.state.contentEditorState}
            onChange={this.changeContentEditorState}
            ref="contentEditor"
            keyBindingFn={keyBindingFn.default}
            />
        </div>
        <input
          type="submit"
          value="save"
          onClick={this.handle_Click_BrickSubmit}
          style={{width: '15%', marginTop: '5%', float: 'right', borderRadius: "3px", backgroundColor: '#466656', fontSize: '1em', color: '#FFFFFF'}}
        />
      </div>
    )
  }
}
