import React from 'react';
import {Editor, EditorState} from 'draft-js';

export class Brick extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      contentEditorState: EditorState.createWithContent(this.props.editorState_Content)
    }
  }

  render(){
    let brickData = this.props.brickData;

    return(
      <div
        className={this.props.brickClass}
        id={String(brickData.index) + String(brickData.row) + "_brick_" + brickData.id}
        draggable={this.props.ifdraggable}
        onDragStart={this.props.handle_Drag}
        onClick={this.props.handle_Click_Brick}>
        {
          this.props.isShowing &&
          <input
            type="button"
            value="close"
            onClick={this.props.handle_Click_BrickClose}/>
        }
        <div
          id={String(brickData.index) + String(brickData.row) + "_brickText_" + brickData.id}
          className="brick-content-text">
          <Editor
            editorState={this.state.contentEditorState}
            ref="contentEditor"
            readOnly
            />
        </div>
        <div
          id={String(brickData.index) + String(brickData.row) + "_brickTopic_" + brickData.id}
          className="brick-content-taggroup">
          {brickData.brickTopic}
        </div>
      </div>
    )
  }
}
