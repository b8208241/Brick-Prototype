import React from 'react';
import ReactDOM from 'react-dom';

const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

export class ModalContainer extends React.Component {
  constructor(props){
    super(props);
  }

  newTreeContainer
  
  componentDidMount(){
    this.newTreeContainer = document.body.appendChild(document.createElement('div'));
    renderSubtreeIntoContainer(this, this.props.children, this.newTreeContainer);
  }

  componentDidUpdate(){
    renderSubtreeIntoContainer(this, this.props.children, this.newTreeContainer);
  }

  componentWillUnmount(){
    ReactDOM.unmountComponentAtNode(this.newTreeContainer);
    document.body.removeChild(this.newTreeContainer);
  }

  render() {
    return null;
  }
}
