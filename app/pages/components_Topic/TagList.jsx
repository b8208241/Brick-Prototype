import React from 'react';

export class TagList extends React.Component {
  constructor(props){
    super(props);
    this.handle_MouseOver_Tag = (event) => $(event.target).css({'text-shadow': '0.5px 0.5px 0px #585b47, 0.5px 0.5px 0px #585b47, 0.5px 0.5px 0px #585b47, 0.5px 0.5px 0px #585b47', 'color': '#585b47'});
    this.handle_MouseOut_Tag = (event) => $(event.target).css({'text-shadow': '', 'color': '#5e93c5'});
    this.handle_Click_Tag = this.handle_Click_Tag.bind(this);
  }

  handle_Click_Tag(event){
    event.preventDefault();
    event.stopPropagation();
    let target = event.target.textContent;
    let searchResult = [{},{},{},{}];
    $.each(this.props.topicThis, function(objName, objValue){
      let j
      for(j=0; j<objValue.length; j++){
        //Some bug, maybe syntex error, happened when using "? :"
        //So just use if statement to passby
        if(objValue[j]["hashTagObj"]){
          if(objValue[j]["hashTagObj"][target]){
            searchResult[objName-1][j] = true;
          }else{
            continue;
          }
        }else{
          continue;
        }
      }
    })
    this.props.handle_Click_Tag(searchResult);
  }

  render(){
    let handle_Click_Tag = this.handle_Click_Tag;
    let handle_MouseOver_Tag = this.handle_MouseOver_Tag;
    let handle_MouseOut_Tag = this.handle_MouseOut_Tag;
    let taggroup = [];
    $.each(this.props.topicThis.hashTag, function(objName, objValue){
      taggroup.push(
        <li
          key={"topicTagKey"+objValue}
          onClick={handle_Click_Tag}
          onMouseOver={handle_MouseOver_Tag}
          onMouseOut={handle_MouseOut_Tag}>
          {objValue}
        </li>)
    })

    return (
      <div className="topic-wall-row-block-subtopic-taglist">
        <ul>
          {taggroup}
        </ul>
      </div>
    )
  }
}
