class LevelLoader{
  constructor(){
    this.levelsList = [];
    this.levelMenu = document.querySelector('.load-level-menu');
    this.backButton = document.querySelector('.back-button');
    this.createdButtonsCounter = 0;

    this.showLoader();
    this.getLevels();
  }

  showLoader = () => {
    this.levelMenu.style.display = 'block';
    this.backButton.style.display = 'inline-block';
    this.backButton.addEventListener('click', this.goToMenu);
  }

  goToMenu = () => {
    var startMenuContainer = document.querySelector('.start-menu');
    startMenuContainer.style.display = 'block';
    this.levelMenu.style.display = 'none';
    this.backButton.style.display = 'none';
  }

  getLevels = () => {
    for(let i = 0; i < parseInt(localStorage.length); i++){
      this.addLevel(i);
      this.showLevel(i);
    }
  }

  addLevel = (i) => {
    let levelName = localStorage.key(i);
    let level = localStorage.getItem(levelName);
    this.levelsList.push(JSON.parse(level));
  }

  showLevel = (i) => {
    let levelName = localStorage.key(i);
    let level = localStorage.getItem(levelName);
    level = JSON.parse(level);
    this.createdButtonsCounter += 1;
    let levelButton = document.createElement('button');
    levelButton.textContent = "Level - " + level.level;
    levelButton.addEventListener('click', () => {this.startLevel(level)});
    this.levelMenu.prepend(levelButton);
  }

  startLevel(level){
    this.levelMenu.style.display = 'none';
    this.backButton.style.display = 'none';
    var startMenuContainer = document.querySelector('.start-menu');
    startMenuContainer.style.display = 'none';
    mainMap.layers = level.map;
    initializePlayers(level.units);
    mainGameLoop = new MainGameLoop();
  }
}