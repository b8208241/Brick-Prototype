export const defaultCell = {"class":"cell-default cboxElement","index":"", "row":""}
export const defaultContentPage = {
  "topic":"",
  "1":[{"class":"cell-default cboxElement", "index":"0", "row":"1"}, {"class":"placeholder", "index":"1", "row":"1"}, {"class":"cell-default cboxElement", "index":"2", "row":"1"}, {"class":"placeholder", "index":"3", "row":"1"}, {"class":"cell-default cboxElement", "index":"4", "row":"1"}, {"class":"placeholder", "index":"5", "row":"1"}],
  "2":[{"class":"cell-default cboxElement", "index":"0", "row":"2"}, {"class":"placeholder", "index":"1", "row":"2"}, {"class":"cell-default cboxElement", "index":"2", "row":"2"}, {"class":"placeholder", "index":"3", "row":"2"}, {"class":"cell-default cboxElement", "index":"4", "row":"2"}, {"class":"placeholder", "index":"5", "row":"2"}],
  "3":[{"class":"cell-default cboxElement", "index":"0", "row":"3"}, {"class":"placeholder", "index":"1", "row":"3"}, {"class":"cell-default cboxElement", "index":"2", "row":"3"}, {"class":"placeholder", "index":"3", "row":"3"}, {"class":"cell-default cboxElement", "index":"4", "row":"3"}, {"class":"placeholder", "index":"5", "row":"3"}],
  "4":[{"class":"cell-default cboxElement", "index":"0", "row":"4"}, {"class":"placeholder", "index":"1", "row":"4"}, {"class":"cell-default cboxElement", "index":"2", "row":"4"}, {"class":"placeholder", "index":"3", "row":"4"}, {"class":"cell-default cboxElement", "index":"4", "row":"4"}, {"class":"placeholder", "index":"5", "row":"4"}]
}

export function defineTime(){
  let date = new Date();
  let time = date.getTime();
  return time;
}

export function defineTopic(topicData, topicId) {
  console.log("enter defineData")
  return topicData[topicId]
}

export function updateObject(oldObject, newValue) {
    return Object.assign({}, oldObject, newValue)
}

export function createObject(key, value) {
  const obj = {}
  obj[key] = value
  return obj
}

export function updateRowArray(oldRowArray, brickContent) {
  console.log('enter updateRowArray')
  const updatedRowArray = oldRowArray.map(function(item){
    if(item.index !== brickContent.index){
      return item
    }

    const updatedItem = updateObject(item, brickContent)
    return updatedItem
  })

  return updatedRowArray
}

export function updateRow(oldTopicObject, row, brickContent) {
  console.log("enter updateRow")
  const oldRowArray = oldTopicObject[row]
  const newRowArray = updateRowArray(oldRowArray, brickContent)
  const updatedRowObject = createObject(row, newRowArray)

  return updatedRowObject
}

export function updateTopic(oldTopicObject, topicId, newRow) {
  console.log("enter updateTopic")
  const newThisTopicObject = updateObject(oldTopicObject, newRow)
  const updatedTopicObject = createObject(topicId, newThisTopicObject)

  return updatedTopicObject
}
