import {EditorState, RichUtils, Modifier} from 'draft-js';

export function handleKeyCommand_ContentEditor(command, editorState, handle){
  console.log('handleKeyCommand, ContentEditor')
  //RichUtils is like a library, handling most of default command used in editor, like Ctrl + B
  //It will modified the editorState naturally, and return a new editorState
  const newState = RichUtils.handleKeyCommand(editorState, command);
  if(newState) {
    handle(newState);
    return 'handled';
  };

  return 'not-handled';
}

export function handleKeyCommand_TagEditor(command, editorState, handle){
  console.log('handleKeyCommand, TagEditor')
  //RichUtils is like a library, handling most of default command used in editor, like Ctrl + B
  //It will modified the editorState naturally, and return a new editorState
  const newState = RichUtils.handleKeyCommand(editorState, command);

  if(newState) {
    handle(newState);
    return 'handled';
  };
  if(command === 'Space Pressed in Topic Editing TagEditor'){
    const currentContentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const modifiedContentState = Modifier.insertText(currentContentState, selection, " #")
    handle(
      EditorState.moveFocusToEnd(
        EditorState.push(
          editorState,
          modifiedContentState,
          'insert-text'
        )
      )
    );
    return 'handled';
  }

  return 'not-handled';
}
