import React from 'react';

export class ModalBackground extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const style = {
      width: "100%",
      height: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "rgba(156, 152, 152, 0.9)",
      zIndex: 5
    }

    return(
      <div style={style} onClick={this.props.onClose}>
        {this.props.children}
      </div>
    )
  }
}
