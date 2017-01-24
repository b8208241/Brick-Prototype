import React from 'react';

export class ManipulateRow extends React.Component {
  constructor(props){
    super(props);
    this.handle_archive = this.handle_archive.bind(this);
  }

  handle_archive(){}

  render() {
    return(
      <div>
        <input
          type="button"
          className="Manipulate-button"
          value="歸檔"
          onClick={this.handle_archive}
        />
      </div>
    )
  }
}
