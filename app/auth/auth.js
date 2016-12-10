let localStorage = global.window.localStorage;

let auth = {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  login (username, password) {
    if (auth.loggedIn()) return Promise.resolve(true)
    return axios.post('/login', {username, password})
      .then(res => {
        // Save token to local storage
        console.log(res.data)
        localStorage.token = res.data.token
        return Promise.resolve(true)
      })
  },
  /**
  * Logs the current user out
  */
  logout () {
    return axios.post('/logout')
  },
  /**
  * Checks if a user is logged in
  */
  loggedIn () {
    return !!localStorage.token
  },
  /**
  * Registers a user and then logs them in
  * @param  {string} username The username of the user
  * @param  {string} password The password of the user
  */
  register (username, password) {
    // Post a fake request
    return axios.post('/register', {username, password})
      // Log user in after registering
      .then(() => auth.login(username, password))
  },
  onChange () {}
};

export default auth
