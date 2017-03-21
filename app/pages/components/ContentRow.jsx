import React from 'react';
import {Brick} from './Brick.jsx';
import {convertToRaw, convertFromRaw} from 'draft-js';

export class ContentRow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isShowing: false,
      showingIndex: null
    }
    this.handle_dispatch_positionChangeSubmit = this.handle_dispatch_positionChangeSubmit.bind(this);
    this.handle_Drag = this.handle_Drag.bind(this);
    this.handle_Drop = this.handle_Drop.bind(this);
    this.handle_Click_Brick = this.handle_Click_Brick.bind(this);
    this.handle_Click_BrickClose = this.handle_Click_BrickClose.bind(this);
    this.handle_Click_CellDefault = this.handle_Click_CellDefault.bind(this);
    this.preventDefault = (event) => event.preventDefault();
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
    let renderHere = this.props.handle_Click_Brick(clickedBrickRow, clickedBrickIndex);
    if(renderHere){
      this.setState({isShowing: true, showingIndex: clickedBrickIndex});
    }
  }

  handle_Click_BrickClose(event){
    event.preventDefault();
    event.stopPropagation();
    this.setState({isShowing: false});
  }

  handle_Click_CellDefault(event){
    event.preventDefault();
    event.stopPropagation();
    let clickedBrickIndex = Number($(event.target).attr('id').charAt(0));
    let clickedBrickRow = Number($(event.target).attr('id').charAt(1));

    this.props.handle_Click_CellDefault(clickedBrickRow, clickedBrickIndex)
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
    let brickClass
    let ifdraggable
    let ifhandle_Click_Brick
    let preventDefault = this.preventDefault
    let handle_Drop = this.handle_Drop
    let handle_Drag = this.handle_Drag
    let handle_Click_Brick = this.handle_Click_Brick
    let handle_Click_BrickClose = this.handle_Click_BrickClose
    let handle_Click_CellDefault = this.handle_Click_CellDefault
    let showingState = this.state
    let date = new Date();
    let time = date.getTime();

    const contentBricks = this.props.rowRecord.map(
      function(obj){
        if(obj.class == 'cell'){
          let editorState_Content = convertFromRaw(obj.draftData_Content)
          if(showingState.isShowing && showingState.showingIndex === obj.index){
             brickClass = "brickOriginal-showing";
             ifdraggable = false;
             ifhandle_Click_Brick = false;
          }else{
            brickClass = "brickOriginal";
            ifdraggable = "true";
            ifhandle_Click_Brick = handle_Click_Brick;
          };
            return (
              <div
                key={obj.id}
                className={obj.class}
                id={"cell_" + String(obj.index) + String(obj.row) + "_" + obj.id}>
                  <Brick
                    brickData = {obj}
                    brickClass = {brickClass}
                    editorState_Content = {editorState_Content}
                    ifdraggable = {ifdraggable}
                    handle_Drag = {handle_Drag}
                    handle_Click_Brick = {ifhandle_Click_Brick}
                    handle_Click_BrickClose = {handle_Click_BrickClose}
                    isShowing = {showingState.isShowing}/>
              </div>
            );
        }else{
          return (
            <div
              key={String(obj.index) + String(obj.row) + time}
              className={obj.class}
              id={String(obj.index) + String(obj.row) + obj.class} onClick={handle_Click_CellDefault}
              onDragOver={preventDefault}
              onDrop={handle_Drop}/>
          );
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
