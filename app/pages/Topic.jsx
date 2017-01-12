import React from 'react';
import {connect} from 'react-redux'

class Topic extends React.Component {
  render(){
    console.log('enter component Topic')
    let topicId = this.props.params.topicId;
    let topicContent = this.props.brickData.topicContent[topicId];
    return(
      <section>
        <ContentRow id="rowOne" rowRecord = {topicContent.rowOne}/>
        <ContentRow id="rowTwo" rowRecord = {topicContent.rowTwo}/>
        <ContentRow id="rowThree" rowRecord = {topicContent.rowThree}/>
        <ContentRow id="rowFour" rowRecord = {topicContent.rowFour}/>
        <CreateBrick/>
      </section>
    )
  }
}

class ContentRow extends React.Component {
  constructor(props){
    super(props);
    this.loadRow = this.loadRow.bind(this);
  };

  loadRow(){
    return {__html: this.props.rowRecord};
  }

  render() {
    return (
      <div className="row" id={this.props.id} dangerouslySetInnerHTML={this.loadRow()} />
    )
  }
}

class CreateBrick extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleSubmit(){
    $.colorbox.close();
  }

  render() {
    return(
      <div id="addBox" className="add-dialogbox">
		    <textarea className="add-input" id="main_text" ></textarea><br/>
		    <p id="ref"></p><br/>
		    <input type="submit" value="新增磚頭" onClick={this.handleSubmit}/>
	    </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    token: state.token,
    brickData: state.brickData,
    userData: state.userData
  }
}

export default connect(mapStateToProps)(
  Topic
)
