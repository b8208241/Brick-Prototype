import React from 'react';

export class HyphenList extends React.Component {
  constructor(props){
    super(props);
    this.handle_Click_Hyphen = this.handle_Click_Hyphen.bind(this);
  }

  handle_Click_Hyphen(event){
    event.preventDefault();
    event.stopPropagation();
    let target = event.target.textContent;
    let searchResult = [{},{},{},{}];
    $.each(this.props.questions, function(objName, objValue){
      target===objValue.text ? searchResult[Number(objValue.position.charAt(0))-1][Number(objValue.position.charAt(1))] = true : true;
    })
    this.props.handle_Click_Hyphen(searchResult);
  }

  render(){
    let handle_Click_Hyphen = this.handle_Click_Hyphen
    let hyphens = [];
    let repeatCheck = {};
    $.each(this.props.hyphens, function(objName, objValue){
      if(repeatCheck[objValue.text]){
        return true;
      }
      repeatCheck[objValue.text] = true;
      hyphens.push(
        <li
          key={"subTopicHyphenKey"+objValue.text}
          onClick={handle_Click_Hyphen}>
          {objValue.text}
        </li>)
    })

    return (
      <div className="topic-wall-row-block-subtopic-hyphenlist">
        <ul>
          {hyphens}
        </ul>
      </div>
    )
  }
}
