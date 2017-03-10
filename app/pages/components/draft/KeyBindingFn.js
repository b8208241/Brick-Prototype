import {getDefaultKeyBinding} from 'draft-js';
//let getDefaultKeyBinding

export const keyBindingFn = {
  default: function(ev) {
    return getDefaultKeyBinding(ev);
  },
  for_memo: function(ev) {
    if(ev.keyCode === 13) {
      console.log('keyBindingFn, keyCode === 13')
      return 'Enter Press in Memo';
    }
    return getDefaultKeyBinding(ev);
  },
  for_ContentShowing_BrickTopic: function(ev) {
    return getDefaultKeyBinding(ev);
  },
  for_ContentShowing_BrickText: function(ev) {
    return getDefaultKeyBinding(ev);
  },
  for_Topic_NewEdit: function(ev) {
    if(ev.keyCode === 13) {
      console.log('keyBindingFn, keyCode === 13')
      return 'Enter Pressed in ContentCreate';
    }
    return getDefaultKeyBinding(ev);
  }
}
