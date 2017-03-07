export function isURL(str){
  let urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-]*)?\??(?:[\-\+=&;%@\.\w]*)#?(?:[\.\!\/\\\w]*))?)/g ;
  let result = urlRegEx.test(str);
  let url = str.match(urlRegEx)[0]
  return {"result": result, "url": url}
}

export function requestFromServer(url, callBack){
  console.log('tool, requestFromServer')
  let xmlRequest = new XMLHttpRequest();
  xmlRequest.onreadystatechange = function(){
    if(xmlRequest.readyState == 4 && xmlRequest.status == 200){
      callBack(xmlRequest.responseText);
    }
  }
  xmlRequest.open("GET", url, true);
  xmlRequest.send();
}
