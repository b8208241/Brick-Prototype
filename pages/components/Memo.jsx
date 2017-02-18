import React from 'react';

export class Memo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      textValue: ''
    };
    this.handle_keypress = this.handle_keypress.bind(this);
    this.changeText = this.changeText.bind(this);
  };

  handle_keypress(ev){
    if(ev.charCode  === 13){
      this.props.handle_dispatch_newMemoSubmit();
    }
  }

  changeText(ev){
    this.setState({textValue: ev.target.value});
  }

  render() {
    return(
      <div className="memo">
        <div id="addBox" style={{width: '500px'}}>
          <textarea className="add-input" id="main_text" value={this.state.textValue} onChange={this.changeText} onKeyPress={this.handle_keypress}/>
          <br/>
          <p id="ref">p of ref</p><br/>
        </div>
        <ol>

        </ol>
      </div>
    )
  }
}
