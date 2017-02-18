import React from 'react';
import {Memo} from './Memo.jsx';
import {ModalBox} from './ModalBox.jsx';

export class ButtonMemo extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div className="button-memo">
        <input
          type="button"
          value="便條紙"
          style={{height: '35px'}}
          onClick={this.props.handle_click}
        />
        {
          this.props.isShowingMemo &&
          <ModalBox>
            <Memo/>
          </ModalBox>
        }
      </div>
    )
  }
}
