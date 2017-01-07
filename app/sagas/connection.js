let connection = {
  requesting_userData(token){
    console.log('start axios')
    return axios.post('/data', {
      token: token
    }).then(function(res){
      let resData = res.data;
      console.log('recieve res')
      return resData
    })
  }
}

export default connection
