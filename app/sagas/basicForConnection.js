const token = window.localStorage.token;

let connection = {
  post_NewTopic(newRecord, userName, pageObject){
    console.log('ready to post NewTopic')
    axios.post('/post/newtopic/'+userName, {
      "token": token,
      "newRecord": newRecord,
      "pageObject": pageObject
    })
    .then(
      function(res){
        console.log('close posting NewTopic '+ res.data);
      }
    );
  },
  post_EditedBrick(newRecord, row, index,topicId, userName){
    console.log('ready to post EditedBrick')
    axios.post('/post/editedbrick/'+ userName, {
      "token": token,
      "newRecord": newRecord,
      "row": row,
      "index": index,
      "topicId": topicId
    }).then(
      function(res){
        console.log('axios close, posting EditedBrick ' + res.data);
      }
    );
  },
  delete_Brick(newRecord, row, index,topicId, userName){
    console.log('ready to delete Brick')
    axios.delete('/recycle/brick/'+ userName, {
      data: {
        "token": token,
        "newRecord": newRecord,
        "row": row,
        "index": index,
        "topicId": topicId
      }
    }).then(
      function(res){
        console.log('axios close, delete brick' + res.data);
      }
    )
  }
}

export default connection
