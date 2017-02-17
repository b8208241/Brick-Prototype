import React from 'react';

export class MemoTool extends React.Component {
  constructor(props){
    super(props);
    this.handle_Submit = this.handle_Submit.bind(this);
  };

  handle_Submit(){
    console.log('handle_Submit in MemoTool')
  }

  render() {
    return(
      <div>
        <div id="addBox" style={{width: '500px'}}>
          <textarea className="add-input" id="main_text" ></textarea><br/>
          <p id="ref">p of ref</p><br/>
        </div>
        <div className="memo">
          <ol>
            <li>上次輸入的文字</li>
            <li>再上次輸入的文字</li>
          </ol>
        </div>
      </div>
    )
  }
}
