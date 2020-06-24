//sorting
var arr = [
  {
    'id' : 1,
    'name': 'John'
  },
  {
    'id': 2,
    'name': 'Mary'
  },
  {
    'id': 3,
    'name': 'Andrew'
  },
  {
    'id': 4,
    'name': 'Joe'
  }
];

function sortBy(arrayName, key){
  console.log('--- Sorted Array ---');
  sortedArr = arrayName.slice();
  for (var i = 0; i < sortedArr.length - 1; i++){
    for (var j = 0; j < sortedArr.length - i - 1; j++){
      if(sortedArr[j][key] > sortedArr[j+1][key]){
        temp = sortedArr[j+1];
        sortedArr[j + 1] = sortedArr[j];
        sortedArr[j] = temp;
      }
    }
  }
  return sortedArr;
}

var sorted = sortBy(arr, 'name');
console.log(sorted);