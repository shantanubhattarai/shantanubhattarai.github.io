var input = {
  '1': {
    id: 1,
    name: 'John',
    children: [
      { id: 2, name: 'Sally' },
      { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
    ]
  },
  '5': {
    id: 5,
    name: 'Mike',
    children: [{ id: 6, name: 'Peter' }]
  }
};

var output = {
  '1': { id: 1, name: 'John', children: [2, 3] },
  '2': { id: 2, name: 'Sally' },
  '3': { id: 3, name: 'Mark', children: [4] },
  '4': { id: 4, name: 'Harry' },
  '5': { id: 5, name: 'Mike', children: [6] },
  '6': { id: 6, name: 'Peter' }
};
var newObj = {}
var newArr = []
var tempArray = [];

function normalize(inputObject){
  newArr.push(inputObject);
  if('children' in inputObject){
    tempArray = [];
    inputObject['children'].forEach(function(value){
      tempArray.push(value.id);
      inputObject.children = tempArray;
      normalize(value);
    });
  }
}

Object.values(input).forEach(function(value){
  normalize(value);
});


var newObj = newArr.reduce(function(acc, curr, index){
  acc[index + 1] = curr;
  return acc;
}, {});

console.log(newObj);