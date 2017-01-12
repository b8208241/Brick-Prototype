import React from 'react'
import {Route} from 'react-router'
import Main from './Main.jsx'
import Topic from './Topic.jsx'

export default (
  <Route>
    <Route path='/' component={Main}/>
    <Route path='/topic/:topicId' component={Topic}/>
  </Route>
)
