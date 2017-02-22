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
      console.log('handle_keypress, enter pressed')
      this.props.handle_dispatch_newMemoSubmit(this.textValueInput.value);
      this.setState({textValue: ''});
    }
  }

  changeText(ev){
    this.setState({textValue: ev.target.value});
  }

  render() {
    let memoRecords = this.props.memoRecords.map(
      function(obj){
        return (
          <li key={obj.memoIndex}>
            {obj.text}<br/>
            {obj.ref}
          </li>
        )
      }
    )
    return(
      <div className="memo">
        <div id="addBox" style={{width: '500px'}}>
          <textarea
            className="add-input"
            id="main_text"
            value={this.state.textValue}
            ref={(input) => {this.textValueInput = input; }}
            onChange={this.changeText}
            onKeyPress={this.handle_keypress}/>
          <br/>
          <p id="ref">p of ref</p><br/>
        </div>
        <ol>
          {memoRecords}
        </ol>
      </div>
    )
  }
}
