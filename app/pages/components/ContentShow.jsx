import React from 'react';

export class ContentShow extends React.Component {
  render() {
    let text = this.props.rowRecord[this.props.indexShowing].text
    let ref = this.props.rowRecord[this.props.indexShowing].ref

    return(
      <div>
        <div>{text}</div>
        <div>{ref}</div>
      </div>
    )
  }
}
