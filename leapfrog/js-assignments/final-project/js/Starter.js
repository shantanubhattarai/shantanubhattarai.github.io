class Starter {
  constructor(){
    this.preloader = new Preloader();
    this.preloader.load(this.initStarter);

  }

  initStarter = () => {
    var startMenuContainer = document.querySelector('.start-menu');
    startMenuContainer.style.display = 'block';

    this.gameButton = document.querySelector('#game-button');
    this.gameButton.addEventListener('click', startGame);

    this.loadLevelButton = document.querySelector('#load-level-button');
    this.loadLevelButton.addEventListener('click', startLevelLoader);

    this.levelEditorButton = document.querySelector('#level-editor-button');
    this.levelEditorButton.addEventListener('click', startLevelEditor);
  }
}
var mainGameLoop;
var backButton = document.querySelector('.back-button');
var startGame = () => {
  backButton.style.display = 'none';
  var startMenuContainer = document.querySelector('.start-menu');
  startMenuContainer.style.display = 'none';
  mainMap.layers = defaultLayers;
  initializePlayers();
  mainGameLoop = new MainGameLoop();
}

var levelEditor;

var startLevelEditor = () => {
  var startMenuContainer = document.querySelector('.start-menu');
  startMenuContainer.style.display = 'none';
  levelEditor = new LevelEditor();
}

var levelLoader;
var startLevelLoader = () => {
  var startMenuContainer = document.querySelector('.start-menu');
  startMenuContainer.style.display = 'none';
  if(levelLoader == undefined) levelLoader = new LevelLoader();
  else {
    if(levelLoader.createdButtonsCounter < localStorage.length){
      for( let i = levelLoader.createdButtonsCounter; i < localStorage.length; i++){
        console.log(i);
        levelLoader.addLevel(i);
        levelLoader.showLevel(i);
      }
    }
    levelLoader.showLoader();
  };
}

var starter = new Starter();


