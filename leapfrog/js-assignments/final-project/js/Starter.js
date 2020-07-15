class Starter {
  constructor(){
    this.gameButton = document.querySelector('#game-button');
    this.gameButton.addEventListener('click', startGame);
  }
}

var mainGameLoop;


var startGame = () => {
  var startMenuContainer = document.querySelector('.start-menu');
  startMenuContainer.style.display = 'none';
  initializePlayers();
  mainGameLoop = new MainGameLoop();
}

var starter = new Starter();

