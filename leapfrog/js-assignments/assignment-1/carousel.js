var IMAGE_WIDTH = 500;
var container = document.querySelector('.carousel-container');
var imageWrapper = document.querySelector('.carousel-image-wrapper');
var imageArray = imageWrapper.getElementsByTagName('img');
var imageCount = imageArray.length;
var currentIndex = 0;
imageWrapper.style.left = 0 + 'px';

var arrowLeft = document.createElement('div');
arrowLeft.className += "arrow-left arrow";
container.appendChild(arrowLeft);
arrowLeft.onclick = function () {
  elapsedTime = 0;
  var nextIndex = currentIndex - 1;
  if (nextIndex < 0) nextIndex = imageCount - 1;
  transistion(nextIndex);
  currentIndex = nextIndex;
  setActiveStatus();
}

var arrowRight = document.createElement('div');
arrowRight.className += "arrow-right arrow";
container.appendChild(arrowRight);
arrowRight.onclick = function () {
  elapsedTime = 0;
  var nextIndex = currentIndex + 1;
  if (nextIndex > (imageCount - 1)) nextIndex = 0;
  transistion(nextIndex);
  currentIndex = nextIndex;
  setActiveStatus();
}

var navigatorList = document.createElement('ul');
navigatorList.className += "navigator-list";
var navigatorListItems = [];
container.appendChild(navigatorList);
for(var i = 0; i < imageCount; i++){
  var navigatorItem = document.createElement('li');
  navigatorItem.className += "navigator-list-item"
  navigatorList.appendChild(navigatorItem);
  navigatorItem.onclick = (function(index){
    return function() {
      elapsedTime = 0;
      var nextIndex = index;
      transistion(nextIndex);
      currentIndex = nextIndex;
      setActiveStatus();
    };
  })(i);
  navigatorListItems.push(navigatorItem);
}

navigatorListItems[0].classList.add("active");

function setActiveStatus(){
  navigatorListItems.forEach(function(value, index){
    if(index != currentIndex) value.classList.remove("active");
    else value.classList.add("active");
  });
}

function transistion(index){
  var targetLeft = index * -IMAGE_WIDTH;
  var currentLeft = parseInt(imageWrapper.style.left);
  var amountMovedPerFrame = (targetLeft - currentLeft) / 100;
  var imageSlider = setInterval(function (){
    elapsedTime ++;
    if (elapsedTime >= 100){
      clearInterval(imageSlider);
    }
    imageWrapper.style.left = (parseInt(imageWrapper.style.left) + amountMovedPerFrame) + 'px';
  }, 1/60);
}
