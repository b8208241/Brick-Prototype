import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Main from './Main.jsx'
import Topic from './Topic.jsx'
import Nav from './Nav.jsx'
import {SelfNutrition} from './components/SelfNutrition.jsx'
import {SelfProfile} from './components/SelfProfile.jsx'
import {SelfAccumulation} from './components/SelfAccumulation.jsx'

export default (
  <Route component={Nav}>
    <Route path='/' component={Main}>
      <IndexRoute component={SelfNutrition}/>
      <Route path="profile" component={SelfProfile}/>
      <Route path="accumulation" component={SelfAccumulation}/>
    </Route>
    <Route path='/topic/:topicId' component={Topic}/>
  </Route>
)
