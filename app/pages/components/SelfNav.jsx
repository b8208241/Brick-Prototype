import React from 'react';
import { Link, IndexLink } from 'react-router'

export class SelfNav extends React.Component {
  render() {
    return(
      <ul>
        <li className="" id=""><IndexLink to='/'>SelfNutrition</IndexLink></li>
        <li className="" id=""><Link to="/profile">SelfProfile</Link></li>
        <li className="" id=""><Link to="/accumulation">SelfAccumulation</Link></li>
      </ul>
    )
  }
}
