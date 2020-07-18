class LevelEditor{
  constructor(){
    this.layers = [[],[]];
    this.unitsToSpawn = [];
    this.spawnableUnits = [];
    this.placedTiles = new Array(mainMap.cols * mainMap.rows);
    this.mapHeight = mainMap.rows * mainMap.tsize;
    this.mapWidth = mainMap.cols * mainMap.tsize;
    this.canvas = document.querySelector('#main-canvas');
    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;
    this.canvas.style.display = 'inline-block';
    this.canvas.width = mainMap.cols * mainMap.tsize;
    this.canvas.height = 1200;
    this.sourceWidth = 375;
    this.sourceHeight = 530;
    this.unit;
    this.canvas.addEventListener('click', this.clickEventHandler);
    this.mapTilesImage = document.createElement('img');
    this.mapTilesImage.src = './img/RoadTiles.png';
    this.tilesToDraw = [1, 27, 77, 79, 81, 10, 76, 63, 56, 12, 2, 3, 5, 7, 28, 29, 111, 112, 113, 155, 156, 157, 137, 120, 122, 141,133, 134, 135, 500, 501];
    this.sourceTile = 0;
    this.sourceType = 'tile';

    this.spritePos = {
      red: {x: 3, y: 104},
      blue:{x: 392, y: 104},
      green:{x: 3, y: 672},
      yellow:{x: 392, y: 672}
    };

    this.hasDrawnUnitsOnce = false;
    this.context.imageSmoothingEnabled = false;

    this.saveLevelButton = document.querySelector('.save-level');
    this.saveLevelButton.style.display = 'inline-block';
    this.saveLevelButton.addEventListener('click', this.saveLevel);

    this.backButton = document.querySelector('.back-button');
    this.backButton.style.display = 'inline-block';
    this.backButton.addEventListener('click', this.goToMenu);

    this.render();
    this.drawGrid();
    this.initLowerLayer();
  }

  goToMenu = () => {
    var startMenuContainer = document.querySelector('.start-menu');
    startMenuContainer.style.display = 'block';
    this.canvas.style.display = 'none';
    this.saveLevelButton.style.display = 'none';
    this.backButton.style.display = 'none';
  }

  getTileFromNewMap(layer, col, row){
    return this.layers[layer][row * mainMap.cols + col];
  }

  getInteractableTiles(col,row){
    return this.tilesToDraw[row * mainMap.cols + col];
  }

  clickEventHandler = (e) => {
    let rect = this.canvas.getBoundingClientRect();
    let mousePos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }

    this.checkClickSourceTiles(mousePos);
    this.checkClickUnits(mousePos);
    this.checkClickDrawGrid(mousePos);
  }

  checkClickSourceTiles = (mousePos) => {
    if(mousePos.y > this.mapHeight + 10 && mousePos.y < (this.mapHeight + 10 + mainMap.tsize) && mousePos.x < this.tilesToDraw.length * mainMap.tsize){
      let tileX = Math.floor(mousePos.x/ mainMap.tsize);
      let tileY = Math.floor((mousePos.y - this.mapHeight - 10)/ mainMap.tsize);
      let sourceIndex = tileY * this.tilesToDraw.length + tileX;
      this.sourceType = 'tile';
      this.sourceTile = this.tilesToDraw[sourceIndex];
    }
  }

  checkClickUnits = (mousePos) => {
    if(mousePos.y > this.mapHeight + 50 && mousePos.y < (this.mapHeight + 50 + 16 * mainMap.tsize) && mousePos.x < 4 * mainMap.tsize){
      let tileX = Math.floor(mousePos.x/ mainMap.tsize);
      let tileY = Math.floor(mousePos.y/ mainMap.tsize);
      this.sourceType = 'unit';
      this.spawnableUnits.forEach((unit) => {
        if(tileX == unit.tileX && tileY == unit.tileY){
          this.sourceTile = {color: unit.color, tileX: unit.tileX, tileY: unit.tileY, type: unit.type, spritePos: unit.spritePos};
        }
      });
    }
  }

  checkClickDrawGrid = (mousePos) => {
    if(mousePos.y < this.mapHeight && mousePos.x < mainMap.cols * mainMap.tsize){
      let tileX = Math.floor(mousePos.x/ mainMap.tsize);
      let tileY = Math.floor(mousePos.y/ mainMap.tsize);
      let targetTile = tileY * mainMap.cols + tileX;
      if(this.sourceType == 'tile') {
        this.layers[1][targetTile] = this.sourceTile;
        this.unitsToSpawn = this.unitsToSpawn.filter((unit) => {
          if(unit.tileX == tileX + 1 && unit.tileY == tileY + 1){
            return false;
          }
          return true;
        });
      }
      else{
        this.sourceTile.tileX = tileX + 1;
        this.sourceTile.tileY = tileY + 1;
        this.unitsToSpawn.push(this.sourceTile);
        this.sourceTile = 0;
        this.sourceType = 'tile';
      }
      this.context.clearRect(tileX * mainMap.tsize, tileY * mainMap.tsize, mainMap.tsize, mainMap.tsize);
    }
  }

  saveLevel = () => {
    let level = {
      level: parseInt(localStorage.length) + 1,
      map: this.layers,
      units: this.unitsToSpawn
    }
    if(localStorage.length < 9){
      localStorage.setItem('level-' + '0' + (parseInt(localStorage.length) + 1), JSON.stringify(level));
    }else{
      localStorage.setItem('level-' + (parseInt(localStorage.length) + 1), JSON.stringify(level));
    }
  }

  initLowerLayer = () => {
    this.layers[0] = [
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ];
  }

  drawInteractableTiles = () => {
    for(let c = 0; c < this.tilesToDraw.length; c++){
      for (let r = 0; r < 2; r++){
        var tile = this.getInteractableTiles(c,r);
        if (tile !== 0){
          this.context.drawImage(
            this.mapTilesImage,
            (tile > 22) ? ((tile % 22 - 1) * mainMap.sourceSize)+1 : (tile - 1) * mainMap.sourceSize + 1,
            (tile > 22) ? (Math.floor(tile/22) * mainMap.sourceSize)+1 : 1,
            mainMap.sourceSize-1,
            mainMap.sourceSize-1,
            c * (mainMap.tsize),
            this.mapHeight + 10 + r * (mainMap.tsize),
            mainMap.tsize,
            mainMap.tsize
          );
        }
      }
    }
  }

  drawSourceUnits = () => {
    let colors = ['red', 'blue', 'green', 'yellow'];
    let rowUnits = ['Infantry', 'Mech', 'Anti Air', 'APC', 'Artillery', 'MD Tank', 'Tank', 'Missile Launcher', 'Rocket Launcher', 'Recon', 'Bomber', 'Fighter', 'Helicopter', 'Transport Copter', 'Battleship', 'Cruiser'];
    for (let r = 0; r < rowUnits.length; r++){
      for(let i = 0; i < 4; i++){
        this.spawnUnit(i, Math.floor((this.mapHeight + 50)/mainMap.tsize) + r  + 1, colors[i], rowUnits[r]);
        this.context.drawImage(
          mainSpriteSheet,
          this.unit.spritePos[colors[i]]['idle'][0].x,
          this.unit.spritePos[colors[i]]['idle'][0].y,
          mainMap.sourceSize-1,
          mainMap.sourceSize-1,
          i * (mainMap.tsize),
          this.mapHeight + 50 + r * mainMap.tsize,
          mainMap.tsize,
          mainMap.tsize
        );
      }
    }
    this.hasDrawnUnitsOnce = true;
  }

  spawnUnit = (tileX, tileY, color, unitType) => {
    switch (unitType){
      case 'Infantry': {
        this.unit  = new Infantry(tileX, tileY, color);
        this.spawnableUnits.push(this.unit);
        break;
      }
      case 'Mech': {
        this.unit  = new Mech(tileX, tileY, color);
        this.spawnableUnits.push(this.unit);
        break;
      }
      case 'Recon': {
        this.unit  = new Recon(tileX, tileY, color);
        this.spawnableUnits.push(this.unit);
        break;
      }
      case 'Artillery': {
        this.unit  = new Artillery(tileX, tileY, color);
        this.spawnableUnits.push(this.unit);
        break;
      }
      case 'Cruiser': {
        this.unit  = new Cruiser(tileX, tileY, color);
        this.spawnableUnits.push(this.unit);
        break;
      }
      case 'Tank': {
        this.unit  = new Tank(tileX, tileY, color);
        this.spawnableUnits.push(this.unit);
        break;
      }
      case 'MD Tank': {
        this.unit  = new MDTank(tileX, tileY, color);
        this.spawnableUnits.push(this.unit);
        break;
      }
      case 'Helicopter': {
        this.unit  = new Helicopter(tileX, tileY, color);
        this.spawnableUnits.push(this.unit);
        break;
      }
      case 'Anti Air': {
        this.unit  = new AntiAir(tileX, tileY, color);
        this.spawnableUnits.push(this.unit);
        break;
      }
      case 'Missile Launcher': {
        this.unit  = new MissileLauncher(tileX, tileY, color);
        this.spawnableUnits.push(this.unit);
        break;
      }
      case 'APC': {
        this.unit  = new APC(tileX, tileY, color);
        this.spawnableUnits.push(this.unit);
        break;
      }
      case 'Rocket Launcher': {
        this.unit  = new RocketLauncher(tileX, tileY, color);
        this.spawnableUnits.push(this.unit);
        break;
      }
      case 'Transport Copter': {
        this.unit  = new TransportCopter(tileX, tileY, color);
        this.spawnableUnits.push(this.unit);
        break;
      }
      case 'Fighter': {
        this.unit  = new Fighter(tileX, tileY, color);
        this.spawnableUnits.push(this.unit);
        break;
      }
      case 'Bomber': {
        this.unit  = new Bomber(tileX, tileY, color);
        this.spawnableUnits.push(this.unit);
        break;
      }
      case 'Battleship': {
        this.unit  = new Battleship(tileX, tileY, color);
        this.spawnableUnits.push(this.unit);
        break;
      }
    }
  }

  drawLayer = (layer) => {
    for(let c = 0; c < mainMap.cols; c++){
      for (let r = 0; r < mainMap.rows; r++){
        var tile = this.getTileFromNewMap(layer, c, r);
        if (tile !== 0){
          this.context.drawImage(
            this.mapTilesImage,
            (tile > 22) ? ((tile % 22 - 1) * mainMap.sourceSize)+1 : (tile - 1) * mainMap.sourceSize + 1,
            (tile > 22) ? (Math.floor(tile/22) * mainMap.sourceSize)+1 : 1,
            mainMap.sourceSize-1,
            mainMap.sourceSize-1,
            c * (mainMap.tsize),
            r * (mainMap.tsize),
            mainMap.tsize,
            mainMap.tsize
          );
        }
      }
    }
  }

  drawGrid = () => {
    for(let i = 0; i <= mainMap.cols; i++){
      this.context.moveTo(i * mainMap.tsize, 0);
      this.context.lineTo(i * mainMap.tsize, this.mapHeight);
    }
    this.context.stroke();

    for(let i = 0; i <= mainMap.rows; i++){
      this.context.moveTo(0, i * mainMap.tsize);
      this.context.lineTo(this.mapWidth, i * mainMap.tsize);
    }
    this.context.strokeStyle = '#aaa';
    this.context.stroke();
  }

  drawUnits = () => {
    this.unitsToSpawn.forEach((unit) => {
      this.context.drawImage(
        mainSpriteSheet,
        unit.spritePos[unit.color]['idle'][0].x,
        unit.spritePos[unit.color]['idle'][0].y,
        mainMap.sourceSize-1,
        mainMap.sourceSize-1,
        (unit.tileX - 1) * mainMap.tsize,
        (unit.tileY - 1) * mainMap.tsize,
        mainMap.tsize,
        mainMap.tsize
      );
    });
  }

  render = () => {
    this.drawLayer(0);
    this.drawLayer(1);
    this.drawUnits();
    this.drawGrid();
    this.drawInteractableTiles();
    if(!this.hasDrawnUnitsOnce) this.drawSourceUnits();
    window.requestAnimationFrame(this.render);
  }
}