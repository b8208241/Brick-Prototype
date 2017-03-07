import {getDefaultKeyBinding} from 'draft-js';
//let getDefaultKeyBinding

export const keyBindingFn = {
  for_memo: function(ev) {
    if(ev.keyCode === 13) {
      console.log('keyBindingFn, keyCode === 13')
      return 'new memo submit';
    }
    return getDefaultKeyBinding(ev);
  },
  for_ContentShowing_BrickTopic: function(ev) {
    return getDefaultKeyBinding(ev);
  },
  for_ContentShowing_BrickText: function(ev) {
    return getDefaultKeyBinding(ev);
  }
}
