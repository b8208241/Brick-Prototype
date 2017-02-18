import React from 'react';

export class CreateBrick extends React.Component {
  constructor(props){
    super(props);
    this.handle_Submit = this.handle_Submit.bind(this);
  };

  handle_Submit(){
    console.log('handle_Submit in CreateBrick')
    $.colorbox.close();
  }

  render() {
    return(
      <div id="addBox" className="add-dialogbox">
		    <textarea className="add-input" id="main_text" ></textarea><br/>
		    <p id="ref"></p><br/>
		    <input type="submit" value="新增磚頭" onClick={this.handle_Submit}/>
	    </div>
    );
  }
}
