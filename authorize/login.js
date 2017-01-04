import {hashSync} from 'bcryptjs'
import genSalt from './salt.js'

let auth_handler
let localStorage = global.window.localStorage;
let auth = {
 login (username, password) {
   /*
   if (auth.loggedIn()) return Promise.resolve(true)
   */
   axios.post('/log', {username, password})
   .then(res => {
     // Save token to local storage
     localStorage.token = res.data.token;
     auth_handler.next(true);
   });
 },
 //Logs the current user out
 logout () {
   return axios.post('/logout')
 },
 // Registers a user and then logs them in
 register (username, password) {
   return axios.post('/register', {username, password})
     // Log user in after registering
     .then(() => auth.login(username, password))
 },
};


 function loginFlow (data) {
     let {username, password} = data;
     auth_handler = authorize({username, password, isRegistering : false});
     auth_handler.next();
}

/*
 function * registerFlow () {
   while (true) {
     // We always listen to `REGISTER_REQUEST` actions
     let request = yield take(REGISTER_REQUEST)
     let {username, password} = request.data

     // We call the `authorize` task with the data, telling it that we are registering a user
     // This returns `true` if the registering was successful, `false` if not
     let wasSuccessful = yield call(authorize, {username, password, isRegistering: true})

     // If we could register a user, we send the appropiate actions
     if (wasSuccessful) {
       yield put({type: SET_AUTH, newAuthState: true}) // User is logged in (authorized) after being registered
       yield put({type: CHANGE_FORM, newFormState: {username: '', password: ''}}) // Clear form
       forwardTo('/dashboard') // Go to dashboard page
     }
   }
 }
 */

function * authorize ({username, password, isRegistering}) {
  try {
    let salt = genSalt(username)
    let hash = hashSync(password, salt)
    let response

    // For either log in or registering, we call the proper function in the `auth`
    // module, which is asynchronous.
    if (isRegistering) {
      response = yield call(auth.register, username, hash)
    } else {
      response = yield auth.login(username, hash);
    }
    if (response) {
      location.reload(true);
      // ...we send Redux appropiate actions
      //yield put({type: SET_AUTH, newAuthState: true}) // User is logged in (authorized)
    }
  } catch (error) {
    console.log(error)
    //yield put({type: REQUEST_ERROR, error: error.message})

    return false
  }
  finally {
    // When done, we tell Redux we're not in the middle of a request any more
    //yield put({type: SENDING_REQUEST, sending: false})
  }
}

export {
  //registerFlow,
  loginFlow
};
