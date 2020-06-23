root = document.getElementById('root');

var outsideBox = document.createElement('div');
root.appendChild(outsideBox);
outsideBox.style.width = 400 + 'px';
outsideBox.style.height = 400 + 'px';
outsideBox.style.border='2px solid #ccc';
outsideBox.style.margin='auto';
outsideBox.style.position='relative';

var insideCircle = document.createElement('div');
outsideBox.appendChild(insideCircle);
insideCircle.style.backgroundColor='blue';
insideCircle.style.borderRadius='50%';
insideCircle.style.width=50 + 'px';
insideCircle.style.height=50 + 'px';
insideCircle.style.position='absolute';
insideCircle.style.left='50%';
insideCircle.style.transform = 'translateX(-50%)';
insideCircle.style.top='0';

var value = 0;
var dir = 1;
var speed = 3;
function move(){
  if(parseInt(insideCircle.style.top) < 0 || parseInt(insideCircle.style.top) + parseInt(insideCircle.style.height) >= parseInt(outsideBox.style.height)){
    dir = -1 * dir;
  }
  value += speed * dir;
  insideCircle.style.top = value + 'px';
  window.requestAnimationFrame(move);
};

window.requestAnimationFrame(move);