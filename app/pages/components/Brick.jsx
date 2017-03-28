import React from 'react';
import {compositeDecorator} from './draft/CompositeDecorator.jsx';
import {EditorState, convertFromRaw} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
const linkifyPlugin = createLinkifyPlugin({
  target: '_blank'
});
const plugins = [linkifyPlugin]

export class Brick extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      contentEditorState: EditorState.createWithContent(this.props.editorState_Content, compositeDecorator.plugins(plugins))
    }
    this.handle_Click_BrickEdit = (event) => this.props.handle_Click_BrickEdit(this.props.brickRow, this.props.brickIndex);
    this.handle_Click_BrickRecycle = (event) => this.props.handle_Click_BrickRecycle(this.props.brickRow, this.props.brickIndex);
    this.changeContentEditorState = () => {};
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
            value="X"
            className="brick-showing-input-close"
            onClick={this.props.handle_Click_BrickClose}
            readOnly/>
        }
        <div
          id={String(brickData.index) + String(brickData.row) + "_brickText_" + brickData.id}
          className="brick-content-text">
          <Editor
            editorState={this.state.contentEditorState}
            onChange={this.changeContentEditorState}
            ref={(element) => {this.contentEditor = element;}}
            readOnly
            />
        </div>
        <div
          id={String(brickData.index) + String(brickData.row) + "_brickTopic_" + brickData.id}
          className="brick-content-taggroup">
          
        </div>
        {
          this.props.isShowing &&
          <div>
            <input
              type="button"
              value="edit"
              onClick={this.handle_Click_BrickEdit}
              readOnly/>
            <input
              type="button"
              value="recycle"
              onClick={this.handle_Click_BrickRecycle}
              readOnly/>
          </div>
        }
      </div>
    )
  }
}
