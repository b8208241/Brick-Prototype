import React from 'react';
import {DraftEditor} from './draft/DraftEditor.jsx';
import {keyBindingFn} from './draft/KeyBindingFn.js';
import {isURL, requestFromServer} from '../../../resource/js/tool.js';

export class Memo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputValue: '',
      attachmentPreview: null
    };
    this.handle_paste = this.handle_paste.bind(this);
    this.handle_xmlRequest_res = this.handle_xmlRequest_res.bind(this);
    this.changeInput = this.changeInput.bind(this);
  };

  handle_xmlRequest_res(res){
    console.log('call handle_xmlRequest_res')
    this.setState({attachmentPreview: res});
  }

  handle_paste(ev){
    let dataStr = String(ev.clipboardData.getData('Text'))
    let URLJudgment = isURL(dataStr);
    console.log(URLJudgment.result, URLJudgment.url)
    if(URLJudgment.result){
      let url = URLJudgment.url;
      requestFromServer(url, this.handle_xmlRequest_res);
    }
  }

  changeInput(ev){
    this.setState({inputValue: ev.target.value});
  }

  render() {
    let memoRecords = this.props.memoRecords.map(
      function(obj){
        return (
          <li key={obj.memoIndex}>
            {obj.brickTopic}<br/>
            {obj.memoTime}{obj.ref}
            <span style={{float: 'right', fontSize:'0.8em'}}>X</span>
            <span onClick="" style={{float: 'right', fontSize:'0.8em'}}>磚頭</span>
          </li>
        )
      }
    )

    return(
      <div className="memo">
        <div id="addBox" style={{width: '100%'}}>
          <input
            className= ""
            style={{width: '88%', marginLeft:'5%', border:'none', borderBottom:'solid 1px'}}
            id= "memoinput"
            value= {this.state.inputValue}
            ref={(input) => {this.inputValueInput = input;}}
            onChange= {this.changeInput}
            onPaste= {this.handle_paste}/>
          <div className="memo-Editor">
            <DraftEditor keyBindingFn={keyBindingFn.for_memo} returnState={false} handle_dispatch_newMemoSubmit={this.props.handle_dispatch_newMemoSubmit}/>
          </div>
          <p id="ref"></p><br/>
          <div className="attachment-preview" style={{width: '92%', maxHeight:'50%',minHeight:'5%', marginLeft:'4%'}}>
            <div>{this.state.attachmentPreview}</div>
            <div>Should use 'object' Tag</div>
          </div>
        </div>
        <ol>
          {memoRecords}
        </ol>
      </div>
    )
  }
}
