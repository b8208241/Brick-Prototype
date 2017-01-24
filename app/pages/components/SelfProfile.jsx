import React from 'react';
import { Link } from 'react-router'

export class SelfProfile extends React.Component {
  render() {
    console.log('enter component in Main: SefProfile')
    return(
      <div>
        <div>
          <aside>
            <img src="https://upload.wikimedia.org/wikipedia/ja/0/0c/Kumamoto_Sakuranokouji_Kumamon_Figure_1.jpg" id="selfPortrait"/>
          </aside>
          <article>
            about，在這裡簡列基本資料
            <h2>{this.props.userData.userName}</h2>
          </article>
        </div>
        <ul>
          <li><Link to="">媒體喜好</Link></li>
          <li><Link to="">磚塊清單2</Link></li>
          <li><Link to="">磚塊清單3</Link></li>
        </ul>
      </div>
    )
  }
}
