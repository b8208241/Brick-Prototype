const token = window.localStorage.token;

let connection = {
  post_NewTopic(topicId, topic, url, userName){
    console.log('ready to post NewTopic')
    axios.post('/topic/newtopic/'+userName, {
      "token": token,
      "newtopic":{
        "topicId": topicId,
        "topic": topic,
        "url": url
      }
    })
    .then(
      function(res){
        console.log(res.data);
      }
    );
  }
}

export default connection
