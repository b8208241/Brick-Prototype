import React from 'react';
import {Memo} from './Memo.jsx';
import {ModalBox} from './ModalBox.jsx';

export class ButtonMemo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isShowingMemo: false
    };
    this.handle_click_ButtonMemo = this.handle_click_ButtonMemo.bind(this);
  }

  handle_click_ButtonMemo(){
    this.state.isShowingMemo ? this.setState({isShowingMemo: false}) : this.setState({isShowingMemo: true})
  }

  render() {
    console.log('enter ButtonMemo')
    return(
      <div className="button-memo">
        <input
          type="button"
          value="便條紙"
          style={{height: '35px'}}
          onClick={this.handle_click_ButtonMemo}
        />
        {
          this.state.isShowingMemo &&
          <ModalBox>
            <Memo memoRecords={this.props.memoRecords} handle_dispatch_newMemoSubmit={this.props.handle_dispatch_newMemoSubmit}/>
          </ModalBox>
        }
      </div>
    )
  }
}
