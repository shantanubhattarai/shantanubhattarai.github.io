/**
 * Implements a carousel that slides automatically, on clicking
 *  arrows and on clicking the navigation dots
*/

/**
 * Returns a carousel
 * @param containerID The element that contains the carousel, string
 * @param holdTime Time to stay on an image when auto sliding, in seconds
 * @param transitionTime Time it takes for the transition animation to complete, in seconds
*/
var Carousel = function (containerID = 'carousel', holdTime = 1, transitionTime = 1){
  var self = this;
  this.containerID = containerID;
  this.holdTime = holdTime <= 0 ? 1 : holdTime;
  this.transitionTime = transitionTime <= 0 ? 1 : transitionTime;

  var container = document.getElementById(this.containerID);
  var imageWrapper = container.querySelector('.carousel-image-wrapper');
  var imageArray = imageWrapper.getElementsByTagName('img');

  var imageCount = imageArray.length;
  var imageSlideInterval;
  var autoTransitionTimer;
  var currentImageIndex = 0;
  var elapsedTransitionTime = 0;
  var autoTransitionnextImageIndex = 0;

  var IMAGE_WIDTH = container.offsetWidth;
  var WRAPPER_WIDTH = IMAGE_WIDTH * imageCount;

  var clickAllowed = true;
  var hasCompletedOneAutoTransition = false;

  if(imageCount == 0 ){
    container.innerHTML = "No Images";
    container.style.height = 100 + 'px';
    return;
  }

  /* Initialize imageWrapper */
  imageWrapper.style.left = 0 + 'px';
  imageWrapper.style.width = WRAPPER_WIDTH + 'px';

  for(var i = 0; i < imageCount; i++){
    imageArray[i].style.width = IMAGE_WIDTH + 'px';
    imageArray[i].style.height = container.offsetHeight + 'px';
  }

  /* Creates left and right arrows and appends it to the container */
  var arrowLeft = document.createElement('div');
  arrowLeft.className += "arrow-left arrow";
  container.appendChild(arrowLeft);
  var arrowRight = document.createElement('div');
  arrowRight.className += "arrow-right arrow";
  container.appendChild(arrowRight);

  /* Handles onclick event for left arrow */
  arrowLeft.onclick = function () {
    /* Make sure auto-transition is called at least once */
    if(hasCompletedOneAutoTransition){
      clearTimeout(autoTransitionTimer);
      /* prevent multi-clicks */
      if(clickAllowed){
        var nextImageIndex = getNextImageIndex('left');
        startSlideAnimation(nextImageIndex);
      }
    }
  }

  /* Handles onclick event for the right arrow */
  arrowRight.onclick = function () {
    if(hasCompletedOneAutoTransition == true){
      clearTimeout(autoTransitionTimer);
      if(clickAllowed){
        var nextImageIndex = getNextImageIndex('right');
        startSlideAnimation(nextImageIndex);
      }
    }
  }

  /**
  * Resets previous animation, resets timer variables and starts new animation.
  * @param arrowName Direction to move in, takes 'left' and 'right'
  */
  var startSlideAnimation = function(nextImageIndex){
    clearInterval(imageSlideInterval);
    clickAllowed = false;
    elapsedTransitionTime = 0;
    transition(nextImageIndex);
    currentImageIndex = nextImageIndex;
    autoTransitionnextImageIndex = nextImageIndex;
  }

  /** Returns index of the next image to move to
   * @param arrowName Direction to find index for, takes 'left' and 'right'
  */
  var getNextImageIndex = function(arrowName){
    if(arrowName == 'left'){
      var nextImageIndex = currentImageIndex - 1;
      if (nextImageIndex < 0) nextImageIndex = imageCount - 1;
    }else{
      var nextImageIndex = currentImageIndex + 1;
      if (nextImageIndex > (imageCount - 1)) nextImageIndex = 0;
    }
    return nextImageIndex;
  }

  /* Creates list for Navigation dots and appends it to container; */
  var navigatorList = document.createElement('ul');
  navigatorList.className += "navigator-list";
  var navigatorListItems = [];
  container.appendChild(navigatorList);

  /* Creates the navigation dots and adds it to the list element */
  for(var i = 0; i < imageCount; i++){
    var navigatorItem = document.createElement('li');
    navigatorItem.className += "navigator-list-item"
    navigatorList.appendChild(navigatorItem);

    /* Handles onclick event for navigation dots */
    navigatorItem.onclick = (function(index){
      return function() {
        if(index == currentImageIndex){
          return;
        }
        clearTimeout(autoTransitionTimer);
        var nextImageIndex = index;
        startSlideAnimation(nextImageIndex);
      }
    })(i);

    navigatorListItems.push(navigatorItem);
  }
  /* Make the first navigation dot active by default */
  navigatorListItems[0].classList.add("active");

  /* Makes current image dot active */
  var setActiveStatus = function(){
    navigatorListItems.forEach(function(value, index){
      if(index != currentImageIndex) value.classList.remove("active");
      else value.classList.add("active");
    });
  };

  /**
   * Slides the wrapper in transition time
   * @param index The index to transition to, corresponds to indices in imageArray
  */
  var transition = function(index){
    elapsedTransitionTime = 0;
    /**
     * Calculate the number of frames and amount to move per frame needed to
     * travel from the current image position to the target image position
    */
    var targetLeft = index * -IMAGE_WIDTH;
    var currentLeft = parseInt(imageWrapper.style.left);
    var travelDistance = Math.abs(currentImageIndex - index) * IMAGE_WIDTH;
    var numberOfFrames = Math.abs((targetLeft - currentLeft) * self.transitionTime/travelDistance * 20);
    var amountMovedPerFrame = (targetLeft - currentLeft) / numberOfFrames;

    /**
     * Move image by amount to move per frame every 20ms i.e. at 50fps
    */
    imageSlideInterval = setInterval(function (){
      elapsedTransitionTime ++;
      if (elapsedTransitionTime >= numberOfFrames){
        clearInterval(imageSlideInterval);
        currentImageIndex = index;
        setActiveStatus();
        hasCompletedOneAutoTransition = true;
        autoTransition();
        clickAllowed = true;
      }
      imageWrapper.style.left = (parseFloat(imageWrapper.style.left) + amountMovedPerFrame) + 'px';
    }, 20);
  };

  /**
   * Performs the slide animation after time defined in holdtime
  */
  var autoTransition = function () {
    autoTransitionTimer = setTimeout(function(){
      elapsedTransitionTime = 0;
      autoTransitionnextImageIndex = currentImageIndex + 1;
      if (autoTransitionnextImageIndex > (imageCount - 1)) autoTransitionnextImageIndex = 0;
      transition(autoTransitionnextImageIndex);
    }, self.holdTime * 1000);
  };
  autoTransition();
}

var carouselList=[];
function createCarousel(containerID, holdTime, transitionTime){
  for(var i = 0; i < carouselList.length; i++){
    if (carouselList[i].containerID == containerID){
      console.log("this carousel already exists.");
      return;
    }
  }
  document.getElementById(containerID).style.display= 'inline-block';
  var newCarousel = new Carousel(containerID, holdTime, transitionTime);
  carouselList.push(newCarousel);
}

function updateCarousel(objectIndex, holdTime, transitionTime){
  carouselList[objectIndex].holdTime = holdTime;
  carouselList[objectIndex].transitionTime = transitionTime;
}
