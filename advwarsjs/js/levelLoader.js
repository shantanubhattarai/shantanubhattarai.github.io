class LevelLoader{
  constructor(){
    this.levelsList = [];
    this.levelMenu = document.querySelector('.load-level-menu');
    this.backButton = document.querySelector('.back-button');
    this.createdButtonsCounter = 0;

    this.showLoader();
    this.getLevels();
  }

  /** Show the loader buttons */
  showLoader = () => {
    this.levelMenu.style.display = 'block';
    this.backButton.style.display = 'inline-block';
    this.backButton.addEventListener('click', this.goToMenu);
  }

  /** Go to start menu */
  goToMenu = () => {
    var startMenuContainer = document.querySelector('.start-menu');
    startMenuContainer.style.display = 'block';
    this.levelMenu.style.display = 'none';
    this.backButton.style.display = 'none';
  }

  /** Get all levels in storage */
  getLevels = () => {
    for(let i = 0; i < parseInt(localStorage.length); i++){
      this.addLevel(i);
      this.showLevel(i);
    }
  }

  /** Add level if missing
   * @param i key in localstorage
   */
  addLevel = (i) => {
    let levelName = localStorage.key(i);
    let level = localStorage.getItem(levelName);
    this.levelsList.push(JSON.parse(level));
  }

  /** Show level based on key
   * @param i key in localstorage
   */
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

  /** Start clicked level
   * @param level level object from localstorage
   */
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