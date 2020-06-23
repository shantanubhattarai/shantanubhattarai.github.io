var coordinates = [
  {x:10, y:20},
  {x:40, y:40},
  {x:60, y:20},
  {x:70, y:50},
  {x:80, y:80},
  {x:120, y:100},
  {x:160, y:80},
  {x:180, y:120},
  {x:200, y:180},
  {x:260, y:240},
  {x: 280, y: 280}
];

var root = document.getElementById('root');

var outsideBox = document.createElement('div');
root.appendChild(outsideBox);
outsideBox.style.width = 300 + 'px';
outsideBox.style.height = 300 + 'px';
outsideBox.style.border='1px solid #ddd';
outsideBox.style.margin='auto';
outsideBox.style.position='relative';

coordinates.forEach(function(value){
  var insideCircle = document.createElement('div');
  outsideBox.appendChild(insideCircle);
  insideCircle.style.backgroundColor='blue';
  insideCircle.style.borderRadius='50%';
  insideCircle.style.width=10 + 'px';
  insideCircle.style.height=10 + 'px';
  insideCircle.style.position='absolute';
  insideCircle.style.left=value.x + 'px';
  insideCircle.style.top=value.y + 'px';
});

