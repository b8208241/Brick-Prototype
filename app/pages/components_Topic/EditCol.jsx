import React from 'react';
import {StyleGroup} from './draft/StyleGroup.jsx'
import {keyBindingFn} from './draft/KeyBindingFn.js';
import {compositeDecorator} from './draft/CompositeDecorator.jsx';
import {Editor, EditorState, ContentState, convertToRaw, convertFromRaw, Modifier, RichUtils} from 'draft-js';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';

const linkifyPluginContent = createLinkifyPlugin({target: '_blank'});
const linkifyPluginSub = createLinkifyPlugin({target: '_blank'});
const hashtagPluginContent = createHashtagPlugin();
const hashtagPluginSub = createHashtagPlugin();
const pluginDecoratorsContent = [linkifyPluginContent, hashtagPluginContent];
const pluginDecoratorsSub = [linkifyPluginSub, hashtagPluginSub];

export class EditCol extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      subEditorState: this.props.editingOld? EditorState.createWithContent(convertFromRaw(this.props.editingOld.draftData_Sub), compositeDecorator(pluginDecoratorsSub)) : EditorState.createEmpty(compositeDecorator(pluginDecoratorsSub)),
      contentEditorState: this.props.editingOld? EditorState.createWithContent(convertFromRaw(this.props.editingOld.draftData_Content), compositeDecorator(pluginDecoratorsContent)) : EditorState.createEmpty(compositeDecorator(pluginDecoratorsContent)),
      contentEditorClass: "topic-editbrick-col-editorgroup-contentEditor"
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
    let currentPosition = this.props.editingPosition;
    let hashTagObj = {}
    let hyphenObj = {}
    let questionMarkobj = {}

    $(".topic-editbrick-col .draftJsHashtagPlugin__hashtag__1wMVC span>span").each(
      function(index){
        let tagText = $(this).text();
        hashTagObj[tagText] = tagText;
      }
    )
    $(".topic-editbrick-col .draftJsHyphen_hyphen span>span").each(
      function(index){
        let hyphenText = $(this).text();
        let itemName = hyphenText + "_" + currentPosition;
        hyphenObj[itemName] = {text: hyphenText, position: currentPosition};
      }
    )
    $(".topic-editbrick-col .draftJsQuestionmark__questionmark span>span").each(
      function(index){
        let questionText = $(this).text();
        let itemName = questionText + "_" + currentPosition;
        questionMarkobj[itemName] = {text: questionText, position: currentPosition};
      }
    )

    this.props.handle_dispatch_EditedContentSubmit(subEditorData, contentEditorData, hashTagObj, hyphenObj, questionMarkobj);
  }

  handle_KeyCommand_ContentEditor(command){
    console.log('handleKeyCommand, ContentEditor')
    //RichUtils is like a library, handling most of default command used in editor, like Ctrl + B
    //It will modified the editorState naturally, and return a new editorState
    /*const newState = RichUtils.handleKeyCommand(this.state.contentEditorState, command);
    if(newState) {
      changeState(newState);
      return 'handled';
    };*/
    if(command === 'Enter Pressed in Topic Editing contentEditor'){
      this.setState({
        subEditorState: EditorState.createWithContent(ContentState.createFromText(''),compositeDecorator(pluginDecoratorsSub)),
        contentEditorClass: "topic-editbrick-col-editorgroup-contentEditor topic-editbrick-col-editorgroup-contentEditor-active",
        firstEditorExist: true
      })
      return 'handled';
    }

    return 'not-handled';
  }

  componentWillMount(){

  }

  componentDidMount(){
    console.log('EditCol did Mount')
  }

  componentWillReceiveProps(nextProps){
    console.log('EditCol will Receive Props')
    if(nextProps.editingOld){
      this.setState({
        subEditorState: EditorState.createWithContent(convertFromRaw(nextProps.editingOld.draftData_Sub),compositeDecorator(pluginDecoratorsSub)),
        contentEditorState: EditorState.createWithContent(convertFromRaw(nextProps.editingOld.draftData_Content),compositeDecorator(pluginDecoratorsContent)),
        firstEditorExist: true
      })
    }else{
      let newSubEditor = EditorState.push(this.state.subEditorState, ContentState.createFromText(''));
      let newContentEditor = EditorState.push(this.state.contentEditorState, ContentState.createFromText(''));
      this.setState({
       subEditorState: newSubEditor,
       contentEditorState: newContentEditor,
       firstEditorExist: false
     })
    }
  }

  componentWillUpdate(nextProps, nextState){

  }

  componentDidUpdate(){
    console.log('EditBrickCol did Update')
  }

  render(){
    return(
      <div className="topic-editbrick-col">
        <div className="topic-editbrick-col-editorgroup">
          <div className={this.state.contentEditorClass} onClick={this.handle_Click_ContentEditor}>
            <Editor
              editorState={this.state.contentEditorState}
              onChange={this.changeContentEditorState}
              ref={(element) => {this.contentEditor = element;}}
              keyBindingFn={keyBindingFn.for_Topic_Editing_ContentEditor}
              handleKeyCommand={this.handle_KeyCommand_ContentEditor}
              />
          </div>
          <div className="topic-editbrick-col-editorgroup-subEditor">
            <Editor
              editorState={this.state.subEditorState}
              onChange={this.changeSubEditorState}
              ref={(element) => {this.subEditor = element;}}
            />
          </div>
          <StyleGroup
            editorState={this.state.contentEditorState}
            onChange={this.changeContentEditorState}/>
        </div>
        <input
          value="X"
          className="topic-editbrick-col-input-close"
          onClick={this.props.close_EditCol}
          readOnly/>
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
