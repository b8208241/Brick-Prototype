// token = window.localStorage.token;

let link = [
  {"href": "/resource/css/nav.css", rel: "stylesheet"},
  {"href": "/resource/css/main.css", rel: "stylesheet"},
  {"href": "/resource/css/topic.css", rel: "stylesheet"},
  {"href": "/resource/css/draft.css", rel: "stylesheet"},
  {"href": "/resource/css/topic_wall.css", rel: "stylesheet"},
  {"href": "/resource/css/topic_wall_brick.css", rel: "stylesheet"}
]
link.forEach(function(ele){
  let newLink = document.createElement('link');
  newLink.setAttribute('href', ele.href);
  newLink.setAttribute('rel', ele.rel);
  document.getElementsByTagName('head')[0].appendChild(newLink)
})
let script = [
  {"src": "/resource/js/opp_topic.js", type:"text/javascript"},
  {"src": "/resource/js/functionTool.js", type: "text/javascript"}
];
script.forEach(function(ele){
  let newScript = document.createElement('script');
  newScript.setAttribute('src', ele.src);
  newScript.setAttribute('type', ele.type);
  document.getElementsByTagName('head')[0].appendChild(newScript)
})
