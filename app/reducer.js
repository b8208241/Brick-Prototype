import connection from './js/connection.js'

import {
  SENDING_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR,
  UPDATE_USERDATA,
  UPDATE_USERDATA_TOPICSAVED
} from './actions/constants.js'

/*
let initialState = {
  token: localStorage.token,
  error: '',
  currentlySending: false,
  loggedIn:true,
  userData:''
}
*/

// Takes care of changing the application state
function reducer (state, action) {
  switch (action.type) {
    case SENDING_REQUEST:
      return {...state, currentlySending: action.sending}
    case REQUEST_ERROR:
      return {...state, error: action.error}
    case CLEAR_ERROR:
      return {...state, error: ''}
    case UPDATE_USERDATA:
      return {...state, userData: action.data}
    default:
      return state
  }
}

export default reducer
