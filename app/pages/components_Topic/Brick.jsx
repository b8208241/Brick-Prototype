import React from 'react';
import {compositeDecorator} from './draft/CompositeDecorator.jsx';
import {EditorState, convertFromRaw} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';

const linkifyPluginContent = createLinkifyPlugin({target: '_blank'});
const hashtagPluginContent = createHashtagPlugin();
const pluginsContent = [linkifyPluginContent, hashtagPluginContent];

export class Brick extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      contentEditorState: EditorState.createWithContent(convertFromRaw(this.props.brickData.draftData_Content), compositeDecorator(pluginsContent))
    }
    this.changeContentEditorState = () => {};
  }

  render(){
    let brickData = this.props.brickData;
    let taggroup = [];
    $.each(brickData.hashTagObj, function(tagName, tagValue){
      taggroup.push(<li key={"brickTagKey"+tagValue}>{tagValue}</li>)
    })

    return(
      <div
        className="brick"
        id={String(brickData.index) + String(brickData.row) + "_brick_" + brickData.id}
        draggable="true"
        onDragStart={this.props.handle_Drag}
        onClick={this.props.handle_Click_BrickOpen}>
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
          {taggroup}
        </div>
      </div>
    )
  }
}
