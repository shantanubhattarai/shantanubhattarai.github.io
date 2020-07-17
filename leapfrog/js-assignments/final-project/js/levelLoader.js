class LevelLoader{
  constructor(){
    this.levelsList = [];
    this.levelMenu = document.querySelector('.load-level-menu');
    this.backButton = document.querySelector('.back-button');
    this.showLoader();
    this.getLevels();
    this.createdButtons = false;
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
      let levelName = localStorage.key(i);
      let level = localStorage.getItem(levelName);
      this.levelsList.push(JSON.parse(level));
    }
    this.showLevels();
  }

  showLevels = () => {
    this.levelsList.forEach((level) => {
      let levelButton = document.createElement('button');
      levelButton.textContent = "Level - " + level.level;
      levelButton.addEventListener('click', () => {this.startLevel(level)});
      this.levelMenu.appendChild(levelButton);
    });
  }

  startLevel(level){
    var startMenuContainer = document.querySelector('.start-menu');
    startMenuContainer.style.display = 'none';
    mainMap.layers = level.map;
    initializePlayers();
    mainGameLoop = new MainGameLoop();
  }
}