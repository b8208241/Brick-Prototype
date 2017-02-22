import React from 'react';
import {Memo} from './Memo.jsx';
import {ModalBox} from './ModalBox.jsx';

export class ContentRow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isShowingBrick : false
    }
    this.handle_dispatch_newContentSubmit = this.handle_dispatch_newContentSubmit.bind(this);
    this.handle_dispatch_positionChangeSubmit = this.handle_dispatch_positionChangeSubmit.bind(this);
    this.handle_Drop = this.handle_Drop.bind(this);
    this.preventDefault = this.preventDefault.bind(this);
  }

  preventDefault(event){
    event.preventDefault();
  }

  handle_dispatch_positionChangeSubmit(originIndex, originRow, newIndex, newRow){
    console.log('handle_dispatch_positionChangeSubmit in ContentRow')
    this.props.handle_dispatch_positionChangeSubmit(originIndex, originRow, newIndex, newRow)
  }

  handle_dispatch_newContentSubmit(text, ref, containerIndex, containerRow){
    console.log('handle_dispatch_newContentSubmit in ContentRow')
    this.props.handle_dispatch_newContentSubmit(text, ref, containerIndex, containerRow)
  }

  handle_Drop(event){
    console.log('handle_Drop in ContentRow')
    event.preventDefault();
    event.stopPropagation();
    const anchorId = event.dataTransfer.getData("dragging");
    const newContainer = event.target;

    let newIndex = Number($(newContainer).attr("id").charAt(0));
    let newRow = Number($(newContainer).attr("id").charAt(1));
    let originIndex = Number($('#'+anchorId).parent().attr('id').charAt(0));
    let originRow = Number($('#'+anchorId).parent().attr('id').charAt(1));

    this.handle_dispatch_positionChangeSubmit(originIndex, originRow, newIndex, newRow)
  }

  componentDidMount(){
    console.log('component did mount')
    this.set_Colorbox_celldefault('.cell-default', this.handle_dispatch_newContentSubmit);
    this.set_Colorbox_cell('.colorbox-anchor');
  }

  componentDidUpdate(){
    console.log('component did update')
    this.set_Colorbox_celldefault('.cell-default', this.handle_dispatch_newContentSubmit);
    this.set_Colorbox_cell('.colorbox-anchor');
  }

  render(){
    console.log('enter ContentRow')
    let preventDefault = this.preventDefault
    let handle_Drop = this.handle_Drop

    let contentBricks = this.props.rowRecord.map(
      function(obj){
        if(obj.class == 'cell'){
          return (
            <div key={obj.index} className={obj.class} id={String(obj.index) + String(obj.row) + "_" + obj.id}>
              <a className="colorbox-anchor" href={"#"+obj.id} id={"anchor_"+obj.id}>
                <div className="brickOriginal"  id={obj.id} draggable="true" onDragStart={drag}>
                  <div className="brick-content">{obj.text}</div>
                  <p className="brick-ref">{obj.ref}</p>
                  <input type="submit" value="Delete" onClick={cellDelete_colorbox} />
                </div>
              </a>
            </div>
          )
        }else{
          return <div key={obj.index} className={obj.class} id={String(obj.index) + String(obj.row) + obj.class} onDragOver={preventDefault} onDrop={handle_Drop}/>;
        }
      }
    )

    return(
      <div className={this.props.class} id={this.props.id}>
        <div className="placeholder"></div>
        {contentBricks}
      </div>
    )
  }
}
