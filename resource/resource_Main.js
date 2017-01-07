// token = window.localStorage.token;

let link = [
  {"href": "/resource/css/main.css", rel: "stylesheet"},
  {"href": "/resource/css/wall.css", rel: "stylesheet"}
]
link.forEach(function(ele){
  let newLink = document.createElement('link');
  newLink.setAttribute('href', ele.href);
  newLink.setAttribute('rel', ele.rel);
  document.getElementsByTagName('head')[0].appendChild(newLink)
})
let script = [
  {"src": "/resource/js/opp_main.js", type:"text/javascript"},
  {"src": "/resource/js/opp_wall.js", type:"text/javascript"}
];
script.forEach(function(ele){
  let newScript = document.createElement('script');
  newScript.setAttribute('src', ele.src);
  newScript.setAttribute('type', ele.type);
  document.getElementsByTagName('head')[0].appendChild(newScript)
})
