import React from 'react';
import {ModalBox} from './ModalBox.jsx'
import {DraftEditor} from './draft/DraftEditor.jsx';
import {keyBindingFn} from './draft/KeyBindingFn.js';
import {convertToRaw, convertFromRaw} from 'draft-js';

export class ContentCreate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isCreating: true,
      newEditTopic: null,
      newEditText: null
    };
    this.handle_Click_open = this.handle_Click_open.bind(this);
    this.handle_Click_shrimp = this.handle_Click_shrimp.bind(this);
    this.handle_keycommand_ContentCreate = this.handle_keycommand_ContentCreate.bind(this);
    this.updateTopicState = (newState) => this.setState({newEditTopic: newState});
    this.updateTextState = (newState) => this.setState({newEditText: newState});
  }

  handle_Click_open(evet){
    event.preventDefault();
    event.stopPropagation();
    this.state.isCreating ? this.setState({isCreating: false}) : this.setState({isCreating: true})
  }

  handle_Click_shrimp(event){
    event.preventDefault();
    event.stopPropagation();
    this.state.isCreating ? this.setState({isCreating: false}) : this.setState({isCreating: true})
  }

  handle_keycommand_ContentCreate(){
    console.log('ContentCreate, handle Keycommand')
    let newEditTopicData = convertToRaw(this.state.newEditTopic.getCurrentContent());
    let newEditTextData = convertToRaw(this.state.newEditText.getCurrentContent());
    this.props.handle_dispatch_newBrickSubmit(newEditTopicData, newEditTextData);
  }

  render() {
    console.log('enter ContentCreate')
    return(
      <div className="cell-create" onClick={this.handle_Click_open}>
      {
        this.state.isCreating &&
          <ModalBox>
            <div className="cell-create-edit">
              <div className="cell-create-edit-topic">
                <DraftEditor returnState={true} keyBindingFn={keyBindingFn.default} updateEditorState={this.updateTopicState}/>
              </div>
              <span onClick={this.handle_Click_shrimp}>
                箭頭縮小
              </span>
              <div className="cell-create-edit-text">
                <DraftEditor returnState={true} keyBindingFn={keyBindingFn.for_Topic_NewEdit} updateEditorState={this.updateTextState} handle_keycommand_ContentCreate={this.handle_keycommand_ContentCreate}/>
              </div>
            </div>
          </ModalBox>
      }
      </div>
    )
  }
}
