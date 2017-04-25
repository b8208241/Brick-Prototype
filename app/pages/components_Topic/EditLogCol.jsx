import React from 'react';
import {TopicLogItem} from './TopicLogItem.jsx';
import {Editor, EditorState, convertToRaw} from 'draft-js';

export class EditLogCol extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.changeEditorState = (newState) => {this.setState({editorState: newState})};
    this.handle_Click_LogSubmit = this.handle_Click_LogSubmit.bind(this);
  }

  handle_Click_LogSubmit(event){
    event.preventDefault();
    event.stopPropagation();
    let logDraftData = convertToRaw(this.state.editorState.getCurrentContent());
    this.props.handle_dispatch_LogSubmit(logDraftData);
  }

  render(){
    let logList = this.props.logData.map(
      function(obj, index){
        return (
          <li key={"key_EditLogListItem"+index+"_"+obj.creatingTime}>
            <TopicLogItem
              logItemData = {obj.draftData}/>
            <div>{obj.creatingTime}</div>
          </li>
        )
      }
    )

    return(
      <div className="topic-modal-editlogcol">
        <div className="topic-modal-editlogcol-editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.changeEditorState}
            />
        </div>
        <span onClick={this.handle_Click_LogSubmit}>save</span>
        <ul className="topic-modal-editlogcol-topiclog">
          {logList}
        </ul>
      </div>
    )
  }
}
