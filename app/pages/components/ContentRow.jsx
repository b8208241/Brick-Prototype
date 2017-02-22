import React from 'react';
import {Memo} from './Memo.jsx';
import {ModalBox} from './ModalBox.jsx';

export class ContentRow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isShowingBrick : false
    }
    this.handle_dispatch_positionChangeSubmit = this.handle_dispatch_positionChangeSubmit.bind(this);
    this.handle_Drag = this.handle_Drag.bind(this);
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

  handle_Drag(event){
      //target the "brickOriginal" <div>
    event.dataTransfer.setData("dragging", event.target.id);
  }

  handle_Drop(event){
    console.log('handle_Drop in ContentRow')
    event.preventDefault();
    event.stopPropagation();
    const brickId = event.dataTransfer.getData("dragging");
    const newContainer = event.target;

    let newIndex = Number($(newContainer).attr("id").charAt(0));
    let newRow = Number($(newContainer).attr("id").charAt(1));
    let originIndex = Number($('#'+brickId).parent().attr('id').charAt(0));
    let originRow = Number($('#'+brickId).parent().attr('id').charAt(1));

    this.handle_dispatch_positionChangeSubmit(originIndex, originRow, newIndex, newRow)
  }

  componentDidMount(){
    console.log('component did mount')
  }

  componentDidUpdate(){
    console.log('component did update')
  }

  render(){
    console.log('enter ContentRow')
    let preventDefault = this.preventDefault
    let handle_Drop = this.handle_Drop
    let handle_Drag = this.handle_Drag

    let contentBricks = this.props.rowRecord.map(
      function(obj){
        if(obj.class == 'cell'){
          return (
            <div key={obj.index} className={obj.class} id={String(obj.index) + String(obj.row) + "_" + obj.id}>
                <div className="brickOriginal"  id={obj.id} draggable="true" onDragStart={handle_Drag}>
                  <div className="brick-content">{obj.text}</div>
                  <p className="brick-ref">{obj.ref}</p>
                </div>
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
