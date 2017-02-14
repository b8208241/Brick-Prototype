import React from 'react';

export class TopicCollect extends React.Component {
  constructor(props){
    super(props);
    this.handle_Submit = this.handle_Submit.bind(this);
  };

  handle_Submit(){
    console.log('handle_Submit in CreateBrick')

  }

  render() {
    return(
      <div>
        <div id="addBox" style={{width: '500px', height: '200px'}}>
          <textarea className="add-input" id="main_text" ></textarea><br/>
          <p id="ref"></p><br/>
          <input type="submit" value="新增磚頭" onClick={this.handle_Submit}/>
        </div>
        <div className="memo">
          <textarea/>
          <ol>
            <li>上次輸入的文字</li>
            <li>再上次輸入的文字</li>
          </ol>
        </div>
      </div>
    )
  }
}
