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
    this.handle_Click_Brick = this.handle_Click_Brick.bind(this);
    this.preventDefault = this.preventDefault.bind(this);
  }

  preventDefault(event){
    event.preventDefault();
  }

  handle_dispatch_positionChangeSubmit(originIndex, originRow, newIndex, newRow){
    console.log('handle_dispatch_positionChangeSubmit in ContentRow')
    this.props.handle_dispatch_positionChangeSubmit(originIndex, originRow, newIndex, newRow)
  }

  handle_Click_Brick(event){
    event.preventDefault();
    event.stopPropagation();
    let clickedBrickIndex = Number($(event.target).attr('id').charAt(0));
    let clickedBrickRow = Number($(event.target).attr('id').charAt(1));
    this.props.handle_Click_Brick(clickedBrickIndex, clickedBrickRow);
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
    let originIndex = Number($('#'+brickId).attr('id').charAt(0));
    let originRow = Number($('#'+brickId).attr('id').charAt(1));

    this.handle_dispatch_positionChangeSubmit(originIndex, originRow, newIndex, newRow)
  }

  componentDidMount(){

  }

  componentDidUpdate(){

  }

  render(){
    console.log('enter ContentRow')
    let preventDefault = this.preventDefault
    let handle_Drop = this.handle_Drop
    let handle_Drag = this.handle_Drag
    let handle_Click_Brick = this.handle_Click_Brick
    let date = new Date();
    let time = date.getTime();

    let contentBricks = this.props.rowRecord.map(
      function(obj){
        if(obj.class == 'cell'){
          return (
            <div key={obj.id} className={obj.class} id={"cell_" + String(obj.index) + String(obj.row) + "_" + obj.id}>
                <div className="brickOriginal"  id={String(obj.index) + String(obj.row) + "_brick_" + obj.id} draggable="true" onDragStart={handle_Drag} onClick={handle_Click_Brick}>
                  <div id={String(obj.index) + String(obj.row) + "_brickTopic_" + obj.id} className="brick-content-topic">{obj.brickTopic}</div>
                  <div id={String(obj.index) + String(obj.row) + "_brickText_" + obj.id} className="brick-content-text">{obj.text}</div>
                  <p id={String(obj.index) + String(obj.row) + "_brickRef_" + obj.id} className="brick-content-ref">{obj.ref}</p>
                </div>
            </div>
          )
        }else{
          return <div key={String(obj.index) + String(obj.row) + time} className={obj.class} id={String(obj.index) + String(obj.row) + obj.class} onClick={handle_Click_Brick} onDragOver={preventDefault} onDrop={handle_Drop}/>;
        }
      }
    )

    return(
      <div className={this.props.class} id={this.props.id}>
        <div className="placeholder"></div>
        {contentBricks}
        {this.props.children}
      </div>
    )
  }
}
