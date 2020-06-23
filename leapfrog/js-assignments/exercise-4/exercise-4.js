//searching
var fruits = [
  {id: 1, name: 'Banana', color: 'Yellow'},
  {id: 2, name: 'Apple', color: 'Red'}
]

function searchByName(arrayName, searchTerm){
  console.log('--- Search By Name ---');
  arrayName.forEach(
    function(value){
      if(value.name.toLowerCase() == searchTerm.toLowerCase()){
        console.log(value);
      }
    }
  );
}

searchByName(fruits, 'apple');

function searchByKey(arrayName, searchKey, searchTerm){
  console.log('--- Search By Key ---');
  arrayName.forEach(
    function(value){
      if(value[searchKey.toLowerCase()].toLowerCase() == searchTerm.toLowerCase()){
        console.log(value);
      }
    }
  );
}

searchByKey(fruits, 'color', 'yellow');
