import {take, call, put, fork, race, select} from 'redux-saga/effects'
import {
  updateObject,
  createObject,
  spliceArray,
  defineTime
} from './basicTool.js';

export const brickCell = {"class":"cell","index":"", "row":"", "id":"", "draftData_Sub":"", "draftData_Content": "", "hashTagObj": "", "hyphenObj": "", "questionMarkobj": ""}
export const defaultCell = {"class":"cell-default","index":"", "row":"", "id":"", "draftData_Sub":"", "draftData_Content": "", "hashTagObj": "", "hyphenObj": "", "questionMarkobj": ""}
export const defaultPlaceHolder = {"class":"placeholder","index":"", "row":"", "id":"", "hashTagObj": "", "hyphenObj": "", "questionMarkobj": ""}
export const defaultContentPage = {
  "topic":"",
  "log":[],
  "hashTag": {},
  "questions": {},
  "hyphens": {},
  "1":[{"class":"cell-default","index":0, "row":"1", "id":"", "draftData_Sub":"", "draftData_Content": "", "hashTagObj": "", "hyphenObj": "", "questionMarkobj": ""}, {"class":"placeholder","index":"1", "row":"1", "id":""}, {"class":"cell-default","index":2, "row":"1", "id":"", "draftData_Sub":"", "draftData_Content": "", "hashTagObj": "", "hyphenObj": "", "questionMarkobj": ""}, {"class":"placeholder","index":"3", "row":"1", "id":""}, {"class":"cell-default","index":4, "row":"1", "id":"", "draftData_Sub":"", "draftData_Content": "", "hashTagObj": "", "hyphenObj": "", "questionMarkobj": ""}, {"class":"placeholder","index":"5", "row":"1", "id":""}],
  "2":[{"class":"cell-default","index":0, "row":"2", "id":"", "draftData_Sub":"", "draftData_Content": "", "hashTagObj": "", "hyphenObj": "", "questionMarkobj": ""}, {"class":"placeholder","index":"1", "row":"2", "id":""}, {"class":"cell-default","index":2, "row":"2", "id":"", "draftData_Sub":"", "draftData_Content": "", "hashTagObj": "", "hyphenObj": "", "questionMarkobj": ""}, {"class":"placeholder","index":"3", "row":"2", "id":""}, {"class":"","index":4, "row":"2", "id":"_cell_topic"},  {"class":"cell-default","index":5, "row":"2", "id":"", "draftData_Sub":"", "draftData_Content": "", "hashTagObj": "", "hyphenObj": "", "questionMarkobj": ""}],
  "3":[{"class":"cell-default","index":0, "row":"3", "id":"", "draftData_Sub":"", "draftData_Content": "", "hashTagObj": "", "hyphenObj": "", "questionMarkobj": ""}, {"class":"placeholder","index":"1", "row":"3", "id":""}, {"class":"cell-default","index":2, "row":"3", "id":"", "draftData_Sub":"", "draftData_Content": "", "hashTagObj": "", "hyphenObj": "", "questionMarkobj": ""}, {"class":"placeholder","index":"3", "row":"3", "id":""}, {"class":"cell-default","index":4, "row":"3", "id":"", "draftData_Sub":"", "draftData_Content": "", "hashTagObj": "", "hyphenObj": "", "questionMarkobj": ""}, {"class":"placeholder","index":"5", "row":"3", "id":""}],
  "4":[{"class":"cell-default","index":0, "row":"4", "id":"", "draftData_Sub":"", "draftData_Content": "", "hashTagObj": "", "hyphenObj": "", "questionMarkobj": ""}, {"class":"placeholder","index":"1", "row":"4", "id":""}, {"class":"cell-default","index":2, "row":"4", "id":"", "draftData_Sub":"", "draftData_Content": "", "hashTagObj": "", "hyphenObj": "", "questionMarkobj": ""}, {"class":"placeholder","index":"3", "row":"4", "id":""}, {"class":"cell-default","index":4, "row":"4", "id":"", "draftData_Sub":"", "draftData_Content": "", "hashTagObj": "", "hyphenObj": "", "questionMarkobj": ""}, {"class":"placeholder","index":"5", "row":"4", "id":""}]
}

export function defineTopic(topicData, topicId) {
  console.log("enter defineData")
  return topicData[topicId]
}

export function updateTopic(oldTopicObject, topicId, newObject) {
  console.log("enter updateTopic")
  const newThisTopicObject = updateObject(oldTopicObject, newObject)
  const updatedTopicObject = createObject(topicId, newThisTopicObject)

  return updatedTopicObject
}

export function initialPosition(topicThis, currentRow, currentIndex){
  let result = {row: currentRow?currentRow:3, index: currentIndex?currentIndex:2}
  if(topicThis[result.row][result.index].class!=='cell-default'){
    let i;
    let j;
    let n = 0;
    let m = 1;
    let stop =false;
    for(i=3 ; i<5 ; i = i + (Math.pow(-1, i)*(n))){
      let limit = topicThis[i].length;
      for(j=Math.floor(limit/2) ; j<limit ; j= j+(Math.pow(-1, m-1)*m)){
        if(topicThis[i][j].class!=='cell-default'){
          m+=1;
          continue;
        }else{
          result={row: i, index: j};
          stop = true;
          break;
        }
      }
      if(stop){
        break;
      }
      n++;
    }
  }
  return result;
}

/*
Not good enough, bug exist!
export function suggestPosition(topicThis, currentRow, currentIndex){
  let result = {row: currentRow, index: currentIndex}
    let i;
    let j;
    let m;
    let stop =false;
    for(i=0 ; i<4 ; i++){
      let checkRow = currentRow+(Math.pow(-1, i)*i);
      if(checkRow<5 && checkRow>0){
        let arr = [];
        let limit = topicThis[checkRow].length;
        for(m=1 ; m<limit ; m++){
          arr.push(Math.pow(-1, m)*m);
        }
        for(j=0 ; j<arr.length ; j++){
          let checkIndex = currentIndex+arr[j];
          if(checkIndex<limit && checkIndex>-1){
            if(topicthis[i][checkIndex].class==='cell-default'){
              result={row: i, index: checkIndex};
              stop=true;
              break;
            }
          }else{
            continue;
          }
        }
      }
      if(stop){
        break;
      }
    }
  return result;
}*/
