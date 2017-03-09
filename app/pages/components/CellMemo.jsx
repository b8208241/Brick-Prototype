import React from 'react';

export class CellMemo extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.handle_Click_CellMemo = this.handle_Click_CellMemo.bind(this);
  }

  handle_Click_CellMemo(event){
    event.preventDefault();
    event.stopPropagation();
    this.props.handle_Click_CellMemo(clickedBrickIndex, clickedBrickRow);
  }

  render() {
    console.log('enter CellMemo')
    return(
      <div className="cell-memo" onClick={this.handle_Click_CellMemo}/>
    )
  }
}
