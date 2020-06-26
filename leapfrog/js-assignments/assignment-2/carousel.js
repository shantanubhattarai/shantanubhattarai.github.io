var Carousel = function (containerID, holdTime, transitionTime){
  var self = this;
  this.containerID = containerID;
  this.holdTime = holdTime;
  this.transitionTime = transitionTime;

  var container = document.getElementById(containerID);
  var imageWrapper = container.querySelector('.carousel-image-wrapper');
  var imageArray = imageWrapper.getElementsByTagName('img');
  var imageCount = imageArray.length;
  var imageSlider;
  var currentIndex = 0;
  var elapsedTime = 0;
  var sliderNext = 0;
  var IMAGE_WIDTH = 500;
  var WRAPPER_WIDTH = IMAGE_WIDTH * imageCount;
  var clickAllowed = true;
  if(imageCount == 0 ){
    container.innerHTML = "No Images";
  }else{
    imageWrapper.style.left = 0 + 'px';
    imageWrapper.style.width = WRAPPER_WIDTH + 'px';

    var arrowLeft = document.createElement('div');
    arrowLeft.className += "arrow-left arrow";
    container.appendChild(arrowLeft);
    arrowLeft.onclick = function () {
      clearTimeout(autoTransitionTimer);
      if(clickAllowed){
        clearInterval(imageSlider);
        clickAllowed = false;
        elapsedTime = 0;
        var nextIndex = currentIndex - 1;
        if (nextIndex < 0) nextIndex = imageCount - 1;
        transition(nextIndex);
        currentIndex = nextIndex;
        sliderNext = nextIndex;
      }
    }

    var arrowRight = document.createElement('div');
    arrowRight.className += "arrow-right arrow";
    container.appendChild(arrowRight);
    arrowRight.onclick = function () {
      clearTimeout(autoTransitionTimer);
      if(clickAllowed){
        clearInterval(imageSlider);
        clickAllowed = false;
        elapsedTime = 0;
        var nextIndex = currentIndex + 1;
        if (nextIndex > (imageCount - 1)) nextIndex = 0;
        transition(nextIndex);
        currentIndex = nextIndex;
        sliderNext = nextIndex;
      }
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
          clearTimeout(autoTransitionTimer);
          clearInterval(imageSlider);
          clickAllowed = false;
          elapsedTime = 0;
          var nextIndex = index;
          transition(nextIndex);
          currentIndex = nextIndex;
          sliderNext = nextIndex;
        };
      })(i);
      navigatorListItems.push(navigatorItem);
    }

    navigatorListItems[0].classList.add("active");

    var setActiveStatus = function(){
      navigatorListItems.forEach(function(value, index){
        if(index != currentIndex) value.classList.remove("active");
        else value.classList.add("active");
      });
    };

    var transition = function(index){
      elapsedTime = 0;
      var targetLeft = index * -IMAGE_WIDTH;
      var currentLeft = parseInt(imageWrapper.style.left);
      var travelDistance = Math.abs(currentIndex - index) * IMAGE_WIDTH;
      var numberOfFrames = Math.abs((targetLeft - currentLeft) * transitionTime/travelDistance * 20);
      var amountMovedPerFrame = (targetLeft - currentLeft) / numberOfFrames;
      imageSlider = setInterval(function (){
        elapsedTime ++;
        if (elapsedTime >= numberOfFrames){
          clearInterval(imageSlider);
          currentIndex = index;
          setActiveStatus();
          autoTransition();
          clickAllowed = true;
        }
        imageWrapper.style.left = (parseFloat(imageWrapper.style.left) + amountMovedPerFrame) + 'px';
      }, 20);
    };

    var autoTransition = function () {
      autoTransitionTimer = setTimeout(function(){
        elapsedTime = 0;
        sliderNext = currentIndex + 1;
        if (sliderNext > (imageCount - 1)) sliderNext = 0;
        transition(sliderNext);
      }, holdTime * 1000);
    };
    autoTransition();
  }
}
var carousel = new Carousel('carousel-1', 3, 5);
var carousel2 = new Carousel('carousel-2', 4, 1);