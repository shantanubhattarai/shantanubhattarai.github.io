class Preloader {
  constructor(){
    this.images = [
      './img/BattleBackgrounds.png',
      './img/CaptureAnim.png',
      './img/HUD.png',
      './img/logo.png',
      './img/NewBG.png',
      './img/ReverseSprites.png',
      './img/RoadTiles.png',
      './img/UnitMap.png'
  ];
  this.loadedImages = 0;
  }

  load = (start) => {
    var startMenuContainer = document.querySelector('.start-menu');
    startMenuContainer.style.display = 'none';
    var loadingContainer = document.querySelector('.loading-container');
    for (var i = 0; i < this.images.length; i++) {
      var img = new Image;
      img.src = this.images[i];
      img.onload = () => {
        this.loadedImages += 1;
        if (this.loadedImages == this.images.length - 1) {
          loadingContainer.style.display = 'none';
          start();
        }
      }
    }
  }
}
