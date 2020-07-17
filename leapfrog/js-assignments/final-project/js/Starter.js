class Starter {
  constructor(){
    this.gameButton = document.querySelector('#game-button');
    this.gameButton.addEventListener('click', startGame);

    this.loadLevelButton = document.querySelector('#load-level-button');
    this.loadLevelButton.addEventListener('click', startLevelLoader);

    this.levelEditorButton = document.querySelector('#level-editor-button');
    this.levelEditorButton.addEventListener('click', startLevelEditor);
  }
}
var mainGameLoop;

var startGame = () => {
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
  else (levelLoader.showLoader());
}

var starter = new Starter();


