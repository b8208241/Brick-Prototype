import React from 'react';
import {compositeDecorator} from './draft/CompositeDecorator.jsx';
import {EditorState, convertFromRaw} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';

const linkifyPluginContent = createLinkifyPlugin({target: '_blank'});
const linkifyPluginSub = createLinkifyPlugin({target: '_blank'});
const hashtagPluginContent = createHashtagPlugin();
const hashtagPluginSub = createHashtagPlugin();
const pluginsContent = [linkifyPluginContent, hashtagPluginContent];
const pluginsSub = [linkifyPluginSub, hashtagPluginSub];

export class BrickDisplay extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      contentEditorState: EditorState.createWithContent(convertFromRaw(this.props.brickData.draftData_Content), compositeDecorator.plugins(pluginsContent)),
      subEditorState: EditorState.createWithContent(convertFromRaw(this.props.brickData.draftData_Sub), compositeDecorator.plugins(pluginsSub))
    }
    this.handle_Click_BrickEdit = (event) => this.props.handle_Click_BrickEdit(this.props.brickData.row, this.props.brickData.index);
    this.handle_Click_BrickRecycle = (event) => this.props.handle_Click_BrickRecycle(this.props.brickData.row, this.props.brickData.index);
    this.changeContentEditorState = () => {};
    this.changeSubEditorState = () => {};
  }
  render(){
    let brickData = this.props.brickData;
    let taggroup = [];
    $.each(brickData.hashTagObj, function(tagName, tagValue){
      taggroup.push(<li key={"brickTagKey"+tagValue}>{tagValue}</li>)
    })

    return(
      <div
        className="brick-display"
        id={String(brickData.index) + String(brickData.row) + "_brick_" + brickData.id}
        draggable="false">
          <input
            type="button"
            value="X"
            className="brick-display-input-close"
            onClick={this.props.handle_Click_BrickClose}
            readOnly/>
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
            className="">
            <Editor
              editorState={this.state.subEditorState}
              onChange={this.changeSubEditorState}
              ref={(element) => {this.subEditor = element;}}
              readOnly
              />
          </div>
          <div
            id={String(brickData.index) + String(brickData.row) + "_brickTopic_" + brickData.id}
            className="brick-content-taggroup">
            {taggroup}
          </div>
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
      </div>
    )
  }
}
