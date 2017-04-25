export function defineTime(){
  let date = new Date();
  let time = {
    ms: date.getTime(),
    localDate: date.toLocaleDateString()
  }
  return time;
}

export function updateObject(oldObject, newValue) {
    return Object.assign({}, oldObject, newValue)
}

export function createObject(key, value) {
  const obj = {}
  obj[key] = value
  return obj
}

export function spliceArray(oldArray, index, howmany, itemsArray){
  console.log('enter basicTool: spliceArray');
  let reverseItemsArray = itemsArray.reverse();
  reverseItemsArray.map(function(item){
    oldArray.splice(index, howmany, item)
  })
  return oldArray;
}

export function updateArray(oldArray, newItem) {
  console.log('enter updateRowArray')
  const updatedArray = oldArray.map(function(item){
    if(item.index !== newItem.index){
      return item
    }

    const updatedItem = updateObject(item, newItem)
    return updatedItem
  })

  return updatedArray
}
