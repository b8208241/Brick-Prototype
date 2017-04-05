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
    let result = [];
    let i;

    for(i=1;i<5;i++){
      let row = this.props.topicThis[i];
      let status = []
      let j;
      for(j=0; j<row.length; j++){
        status.push(row[j]["hashTagObj"] ? row[j]["hashTagObj"][target] ? true : false :false)
      }
      result.push(status)
    }

    this.props.handle_Click_Tag(result);
  }

  render(){
    let handle_Click_Tag = this.handle_Click_Tag;
    let handle_MouseOver_Tag = this.handle_MouseOver_Tag;
    let handle_MouseOut_Tag = this.handle_MouseOut_Tag;
    let taggroup = [];
    $.each(this.props.topicThis.hashTag, function(tagName, tagValue){
      taggroup.push(
        <li
          key={"topicTagKey"+tagValue}
          onClick={handle_Click_Tag}
          onMouseOver={handle_MouseOver_Tag}
          onMouseOut={handle_MouseOut_Tag}>
          {tagValue}
        </li>)
    })

    return (
      <div className="topic-taggroup">
        <ul>
          {taggroup}
        </ul>
      </div>
    )
  }
}
