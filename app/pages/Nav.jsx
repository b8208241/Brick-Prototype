import React from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';

class Nav extends React.Component {
  render() {
    let token = this.props.token
    let topicData = this.props.topicData
    let userData = this.props.userData
    let contentsBucket = this.props.contentsBucket
    let children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(
        child,
        {
          token: token,
          topicData: topicData,
          userData: userData,
          contentsBucket: contentsBucket
        })
      })
    return(
      <div className="app">
        <ul className="nav">
          <li style={{display: 'inline-block'}}><Link to='/'>Nav bar: 回Main Page</Link></li>
        </ul>
        <div className="container">
          {children}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    token: state.others.token,
    topicData: state.topicData,
    userData: state.others.userData,
    contentsBucket: state.others.contentsBucket
  }
}

export default connect(mapStateToProps)(
  Nav
)
