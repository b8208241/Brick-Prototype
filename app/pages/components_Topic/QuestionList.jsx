import React from 'react';

export class QuestionList extends React.Component {
  constructor(props){
    super(props);
    this.handle_Click_Question = this.handle_Click_Question.bind(this);
  }

  handle_Click_Question(event){
    event.preventDefault();
    event.stopPropagation();
    let target = event.target.textContent;
    let searchResult = [{},{},{},{}];
    $.each(this.props.questions, function(objName, objValue){
      target===objValue.text ? searchResult[Number(objValue.position.charAt(0))-1][Number(objValue.position.charAt(1))] = true : true;
    })
    this.props.handle_Click_Question(searchResult);
  }

  render(){
    let handle_Click_Question = this.handle_Click_Question
    let questions = [];
    let repeatCheck = {};
    $.each(this.props.questions, function(objName, objValue){
      if(repeatCheck[objValue.text]){
        return true;
      }
      repeatCheck[objValue.text] = true;
      questions.push(
        <li
          key={"subTopicQuestionKey"+objValue.text}
          onClick={handle_Click_Question}>
          {objValue.text}
        </li>)
    })

    return (
      <div className="topic-wall-row-block-subtopic-questionlist">
        <ul>
          {questions}
        </ul>
      </div>
    )
  }
}
