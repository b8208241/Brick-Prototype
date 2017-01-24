import React from 'react';

export class Memo extends React.Component {
  render() {
    return(
      <div className="memo">
        <textarea/>
        <ol>
          <li>上次輸入的文字</li>
          <li>再上次輸入的文字</li>
        </ol>
      </div>
    )
  }
}
