import {EditorState, RichUtils, Modifier} from 'draft-js';

export function handleKeyCommand(command, editorState, changeEditorState){
  console.log('handleKeyCommand')
  //RichUtils is like a library, handling most of default command used in editor, like Ctrl + B
  //It will modified the editorState naturally, and return a new editorState
  const newState = RichUtils.handleKeyCommand(editorState, command);

  if(newState) {
    changeEditorState(newState);
    return 'handled';
  };
  if(command === 'Space Pressed in Topic TagEditor'){
    const currentContentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const modifiedContentState = Modifier.insertText(currentContentState, selection, " #")
    changeEditorState(
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
