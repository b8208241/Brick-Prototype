let link = [
  {"href": "./colorbox.css", rel: "stylesheet"},
  {"href": "/index.css", rel: "stylesheet"}
]
link.forEach(function(ele){
  let newLink = document.createElement('link');
  newLink.setAttribute('href', ele.href);
  newLink.setAttribute('rel', ele.rel);
  document.getElementsByTagName('head')[0].appendChild(newLink)
})
let script = [
  {"src": "/opp_index.js?token=" + token, type:"text/javascript"},
  {"src":"./jquery.colorbox.js?token=" + token, type: "text/javascript"}
];
script.forEach(function(ele){
  let newScript = document.createElement('script');
  newScript.setAttribute('src', ele.src);
  newScript.setAttribute('type', ele.type);
  document.getElementsByTagName('head')[0].appendChild(newScript)
})
