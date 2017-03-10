import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Main from './Main.jsx'
import Topic from './Topic.jsx'
import Nav from './Nav.jsx'

export default (
  <Route component={Nav}>
    <Route path='/' component={Main}>

    </Route>
    <Route path='/topic/:topicId' component={Topic}/>
  </Route>
)

//section not used, remain for demonstrating the usage of children, and illustrating the original design
//SelfNutrition, SelfProfile, SelfAccumulation were deleted in later version
//find in prototype-12-16 or online commit
/*Originally
<Route path='/' component={Main}>
  <IndexRoute component={SelfNutrition}/>
  <Route path="profile" component={SelfProfile}/>
  <Route path="accumulation" component={SelfAccumulation}/>
</Route>
*/
