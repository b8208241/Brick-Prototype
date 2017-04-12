import React from 'react';
import {Brick} from './Brick.jsx';
import {BrickDisplay} from './BrickDisplay.jsx';
import {convertToRaw, convertFromRaw} from 'draft-js';

export class ContentRow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isDisplaying: false,
      displayingIndex: null
    }
    this.handle_Drag = this.handle_Drag.bind(this);
    this.handle_Drop = this.handle_Drop.bind(this);
    this.handle_Click_BrickEdit = this.handle_Click_BrickEdit.bind(this);
    this.handle_Click_BrickOpen = this.handle_Click_BrickOpen.bind(this);
    this.handle_Click_BrickClose = this.handle_Click_BrickClose.bind(this);
    this.handle_Click_CellBlank = this.handle_Click_CellBlank.bind(this);
    this.handle_Click_BrickRecycle = (clickedBrickRow, clickedBrickIndex) => this.props.handle_dispatch_RecycleBrickSubmit(clickedBrickRow, clickedBrickIndex);
    this.handle_dispatch_positionChangeSubmit = (originIndex, originRow, newIndex, newRow) => this.props.handle_dispatch_positionChangeSubmit(originIndex, originRow, newIndex, newRow);
    this.preventDefault = (event) => event.preventDefault();
  }

  handle_Click_BrickEdit(event){
    event.preventDefault();
    event.stopPropagation();
    let clickedBrickIndex = Number($(event.target).attr('id').charAt(0));
    let clickedBrickRow = Number($(event.target).attr('id').charAt(1));
    this.props.open_EditCol(clickedBrickRow, clickedBrickIndex, "oldBrick");
    this.setState({isDisplaying: false, displayingIndex: null});
  }

  handle_Click_BrickOpen(event){
    event.preventDefault();
    event.stopPropagation();
    let clickedBrickIndex = Number($(event.target).attr('id').charAt(0));
    if(this.props.editingStatus){

    }else{
      this.setState({isDisplaying: true, displayingIndex: clickedBrickIndex});
    }
  }

  handle_Click_BrickClose(event){
    event.preventDefault();
    event.stopPropagation();
    this.setState({isDisplaying: false, displayingIndex: null});
  }

  handle_Click_CellBlank(event){
    event.preventDefault();
    event.stopPropagation();
    let clickedBrickIndex = Number($(event.target).attr('id').charAt(0));
    let clickedBrickRow = Number($(event.target).attr('id').charAt(1));
    this.props.open_EditCol(clickedBrickRow, clickedBrickIndex, "newBrick");
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
    let editingBrickIndex = this.props.editingBrickIndex
    let searchResult = this.props.searchResult
    let handle_Drop = this.handle_Drop
    let handle_Drag = this.handle_Drag
    let handle_Click_BrickEdit = this.handle_Click_BrickEdit
    let handle_Click_BrickOpen = this.handle_Click_BrickOpen
    let handle_Click_BrickClose = this.handle_Click_BrickClose
    let handle_Click_BrickRecycle = this.handle_Click_BrickRecycle
    let handle_Click_CellBlank = this.handle_Click_CellBlank
    let showingState = this.state
    let date = new Date();
    let time = date.getTime();

    const rowContent = this.props.rowRecord.map(
      function(obj){
        let cellClass
        switch (obj.class) {
          case 'cell':
          if(searchResult){
            cellClass = searchResult[obj.index] ? "cell-editing" : obj.class;
          }else{
            //due to the number would be considered as "false"
            //the props "editingBrickIndex" was plus 1 in purpose during upper level
            cellClass = editingBrickIndex ? obj.index===(editingBrickIndex-1) ? "cell-editing" : obj.class : obj.class;
          }

          return (
            <div
              key={obj.id}
              className={cellClass}
              id={"cell_" + String(obj.index) + String(obj.row) + "_" + obj.id}>
              {
                showingState.isDisplaying ?
                obj.index === showingState.displayingIndex ?
                <BrickDisplay
                  brickData={obj}
                  handle_Click_BrickEdit={handle_Click_BrickEdit}
                  handle_Click_BrickRecycle={handle_Click_BrickRecycle}
                  handle_Click_BrickClose={handle_Click_BrickClose}
                  /> :
                <Brick
                  brickData={obj}
                  handle_Drag={handle_Drag}
                  handle_Click_BrickOpen={handle_Click_BrickOpen}
                  /> :
                <Brick
                  brickData={obj}
                  handle_Drag={handle_Drag}
                  handle_Click_BrickOpen={handle_Click_BrickOpen}
                  />
              }
            </div>
          );
            break;
          case 'cell-default':
          cellClass = editingBrickIndex ? obj.index===(editingBrickIndex-1) ? "cell-editing" : obj.class : obj.class;
          return (
            <div
              key={String(obj.index) + String(obj.row) + time}
              className={cellClass}
              id={String(obj.index) + String(obj.row) + obj.class}
              onClick={handle_Click_CellBlank}
              onDragOver={preventDefault}
              onDrop={handle_Drop}/>
          );
            break;
          default:
          return (
            <div
              key={String(obj.index) + String(obj.row) + time}
              className={obj.class}
              id={String(obj.index) + String(obj.row) + obj.class}
              onDragOver={preventDefault}
              onDrop={handle_Drop}/>
          );
        }
      }
    )


    return(
      <div className={this.props.class} id={this.props.id}>
        <div className="placeholder"></div>
        {rowContent}
      </div>
    )
  }
}
