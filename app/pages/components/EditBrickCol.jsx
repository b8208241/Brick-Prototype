import React from 'react';
import {DraftEditor} from './draft/DraftEditor.jsx';
import {keyBindingFn} from './draft/KeyBindingFn.js';
import {convertToRaw, convertFromRaw} from 'draft-js';

export class EditBrickCol extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      contentEditor: null,
      tagEditor: null
    };
    this.handle_Click_BrickSubmit = this.handle_Click_BrickSubmit.bind(this);
    this.update_ContentEditor = (newState) => this.setState({contentEditor: newState});
    this.update_TagEditor = (newState) => this.setState({tagEditor: newState});
  }

  handle_Click_BrickSubmit(){
    let tagEditorData = convertToRaw(this.state.tagEditor.getCurrentContent());
    let contentEditorData = convertToRaw(this.state.contentEditor.getCurrentContent());
    this.props.handle_dispatch_newBrickSubmit(tagEditorData, contentEditorData);
  }

  componentWillMount(){
    console.log('componentWillMount')
    this.brickTagData = false;
    this.brickContentData = false;
  }

  componentWillUpdate(){
    console.log('componentWillUpdate')
    console.log(this.props.editingBrick)
    if(this.props.editingBrick){
      console.log('componentWillUpdate, editing old brick')
      this.brickTagData = convertFromRaw(this.props.editingBrick.draftBrickTopicData);
      this.brickContentData = convertFromRaw(this.props.editingBrick.draftBrickTextData);
    }
  }

  render(){
    return(
      <div className="topic-edit-brickcol">
        <div style={{width:'80%', marginLeft: '5%', borderBottom: 'solid 1px', borderColor: '#9C9898'}}>
          <DraftEditor returnState={true} contentState={this.brickTagData} updateEditorState={this.update_TagEditor} keyBindingFn={keyBindingFn.default}/>
        </div>
        <div style={{marginLeft: '6%'}}>
          #...推薦hashtag
        </div>
        <div style={{width: "80%", minHeight: '30%', marginLeft: "2%", marginTop: '2%', borderLeft: 'solid 1px', borderColor: '#9C9898'}}>
          <DraftEditor returnState={true} contentState={this.brickContentData} updateEditorState={this.update_ContentEditor} keyBindingFn={keyBindingFn.default}/>
        </div>
        <input
          type="submit"
          value="save"
          onClick={this.handle_Click_BrickSubmit}
          style={{width: '15%', marginTop: '5%', float: 'right', borderRadius: "3px", backgroundColor: '#466656', color: '#FFFFFF'}}
        />
      </div>
    )
  }
}
