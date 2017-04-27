import React from 'react';
import {compositeDecorator} from './draft/CompositeDecorator.jsx';
/*import {EditorState, convertFromRaw} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';

const linkifyPluginContent = createLinkifyPlugin({target: '_blank'});
const linkifyPluginSub = createLinkifyPlugin({target: '_blank'});
const hashtagPluginContent = createHashtagPlugin();
const hashtagPluginSub = createHashtagPlugin();
const pluginsContent = [linkifyPluginContent, hashtagPluginContent];
const pluginsSub = [linkifyPluginSub, hashtagPluginSub];
*/
export class BrickDisplay extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      contentEditorState: EditorState.createWithContent(convertFromRaw(this.props.brickData.draftData_Content), compositeDecorator(pluginsContent)),
      subEditorState: EditorState.createWithContent(convertFromRaw(this.props.brickData.draftData_Sub), compositeDecorator(pluginsSub))
    }
    this.handle_Click_BrickEdit = this.handle_Click_BrickEdit.bind(this);
    this.handle_Click_BrickRecycle = this.handle_Click_BrickRecycle.bind(this);
    this.changeContentEditorState = () => {};
    this.changeSubEditorState = () => {};
  }

  handle_Click_BrickEdit(event){
    event.preventDefault();
    event.stopPropagation();
    this.props.handle_Click_BrickEdit(this.props.brickData.row, this.props.brickData.index);
  }

  handle_Click_BrickRecycle(event){
    event.preventDefault();
    event.stopPropagation();
    this.props.handle_Click_BrickRecycle(this.props.brickData.row, this.props.brickData.index);
  }

  render(){
    let brickData = this.props.brickData;
    let taggroup = [];
    $.each(brickData.hashTagObj, function(tagName, tagValue){
      taggroup.push(<li key={"brickTagKey"+tagValue}>{tagValue}</li>)
    })

    return(
      <div style={{width: "100%", height: "100%", position: "relative"}}>
        <div
          className="brick-display"
          id={String(brickData.index) + String(brickData.row) + "_brick_" + brickData.id}
          draggable="false">
            <div>
              <input
                type="button"
                value="X"
                className="brick-display-input-close"
                onClick={this.props.handle_Click_BrickClose}
                readOnly/>
            </div>
            <div
              id={String(brickData.index) + String(brickData.row) + "_brickText_" + brickData.id}
              className="brick-display-editors">
              <Editor
                editorState={this.state.contentEditorState}
                onChange={this.changeContentEditorState}
                ref={(element) => {this.contentEditor = element;}}
                readOnly
                />
              <Editor
                editorState={this.state.subEditorState}
                onChange={this.changeSubEditorState}
                ref={(element) => {this.subEditor = element;}}
                readOnly
                />
            </div>
            <div className="brick-display-bottomgroup">
              <div
                className="brick-display-bottomgroup-taglist">
                {taggroup}
              </div>
              <div className="brick-display-bottomgroup-spans">
                <span
                  onClick={this.handle_Click_BrickRecycle}>
                  Recycle
                </span>
                <span
                  onClick={this.handle_Click_BrickEdit}>
                  Edit
                </span>
              </div>
            </div>
        </div>
      </div>
    )
  }
}
