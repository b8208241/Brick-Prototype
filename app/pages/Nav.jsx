import React from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';

class Nav extends React.Component {
  render() {
    return(
      <div>
        <ul>
          <li><Link to='/'>Nav bar 位置示意</Link></li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    token: state.token,
    topicData: state.topicData,
    userData: state.userData
  }
}

export default connect(mapStateToProps)(
  Nav
)
