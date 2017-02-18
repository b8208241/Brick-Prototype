import React from 'react';

export class ContentsBucket extends React.Component {
  constructor(props){
    super(props);
    this.drag = this.drag.bind(this);
  };

  drag(ev) {
      //target the <a> tag which wrapping the "brick"<div>
  	ev.dataTransfer.setData("dragging", ev.target.parentElement.id);
  }

  render() {
    console.log('enter component in Main: ContentsBucket')
    let drag = this.drag;
    let contentsBucketBlock = this.props.contentsBucket.map(
      function(obj){
          return (
            <li key={obj.id} id={"bucket_" + obj.id} className={obj.class}>
              <a className="colorbox-anchor" href={"#"+obj.id} id={"anchor_"+obj.id}>
                <div className="brickOriginal"  id={obj.id} draggable="true" onDragStart={drag}>
                  <div className="brick-content">{obj.text}</div>
                  <p className="brick-ref">{obj.ref}</p>
                  <input type="submit" value="Delete" onClick="" />
                </div>
              </a>
            </li>
          )
      }
    );
    return(
      <ol className="block-content">
        {contentsBucketBlock}
      </ol>
    )
  }
}
