export function updateObject(oldObject, newValue) {
    return Object.assign({}, oldObject, newValue)
}

export function createObject(key, value) {
  const obj = {}
  obj[key] = value
  return obj
}

export function spliceArray(oldArray, index, howmany, itemsArray){
  console.log('enter modifier: spliceArray');
  let reverseItemsArray = itemsArray.reverse();
  reverseItemsArray.map(function(item){
    oldArray.splice(index, howmany, item)
  })
  return oldArray;
}
