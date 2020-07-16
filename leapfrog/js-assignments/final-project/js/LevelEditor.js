class LevelEditor{
  constructor(){
    this.layers = [[],[]];
    this.placedTiles = new Array(mainMap.cols * mainMap.rows);
    this.mapHeight = mainMap.rows * mainMap.tsize;
    this.mapWidth = mainMap.cols * mainMap.tsize;
    this.canvas = document.querySelector('#main-canvas');
    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;
    this.canvas.style.display = 'inline-block';
    this.canvas.width = mainMap.cols * mainMap.tsize;
    this.canvas.height = 850;
    this.sourceWidth = 375;
    this.sourceHeight = 530;
    this.canvas.addEventListener('click', this.clickEventHandler);
    this.canvas.addEventListener('mousemove', this.mouseMoveEventHandler);
    this.mapTilesImage = document.createElement('img');
    this.mapTilesImage.src = './img/RoadTiles.png';
    this.tilesToDraw = [1, 27, 77, 79, 81, 10, 76, 63, 56, 12, 2, 3, 5, 7, 28, 29, 111, 112, 113, 155, 156, 157, 137, 120, 122, 141, 134, 135, 500, 501];
    this.sourceTile = 0;
    this.sourceType = 'tile';
    this.mapTilesImage.addEventListener('load', this.render);
    this.spawnableUnits = [];
    this.spritePos = {
      red: {x: 3, y: 104},
      blue:{x: 392, y: 104},
      green:{x: 3, y: 672},
      yellow:{x: 392, y: 672}
    };
    this.drawGrid();
    this.initLowerLayer();
    this.context.imageSmoothingEnabled = false;
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
    if(mousePos.y > this.mapHeight + 50 && mousePos.y < (this.mapHeight + 50 + mainMap.tsize) && mousePos.x < 4 * mainMap.tsize){
      let tileX = Math.floor(mousePos.x/ mainMap.tsize);
      let tileY = Math.floor(mousePos.y/ mainMap.tsize);
      this.sourceType = 'unit';
      this.spawnableUnits.forEach((unit) => {
        if(tileX == unit.tileX && tileY == unit.tileY){
          this.sourceTile = unit;
        }
      });
    }
  }

  checkClickDrawGrid = (mousePos) => {
    if(mousePos.y < this.mapHeight && mousePos.x < mainMap.cols * mainMap.tsize){
      let tileX = Math.floor(mousePos.x/ mainMap.tsize);
      let tileY = Math.floor(mousePos.y/ mainMap.tsize);
      let targetTile = tileY * mainMap.cols + tileX;
      if(this.sourceType == 'tile') this.layers[1][targetTile] = this.sourceTile;
      else{
        this.sourceTile.tileX = tileX + 1;
        this.sourceTile.tileY = tileY + 1;
        unitsToSpawn.push(this.sourceTile);
        this.sourceTile = 0;
        this.sourceType = 'tile';
      }
      this.context.clearRect(tileX * mainMap.tsize, tileY * mainMap.tsize, mainMap.tsize, mainMap.tsize);
      this.render();
    }
  }

  mouseMoveEventHandler = () => {

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
    let colors = ['red', 'blue', 'green', 'yellow'];
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
    for(let i = 0; i < 4; i++){
      let unit  = new Unit(i, Math.floor((this.mapHeight + 50)/mainMap.tsize)  + 1, colors[i]);
      this.spawnableUnits.push(unit);
      this.context.drawImage(
        mainSpriteSheet,
        this.spritePos[colors[i]].x,
        this.spritePos[colors[i]].y,
        mainMap.sourceSize-1,
        mainMap.sourceSize-1,
        i * (mainMap.tsize),
        this.mapHeight + 50,
        mainMap.tsize,
        mainMap.tsize
      );
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
    unitsToSpawn.forEach((unit) => {
      this.context.drawImage(
        mainSpriteSheet,
        this.spritePos[unit.color].x,
        this.spritePos[unit.color].y,
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
    // window.requestAnimationFrame(this.render);
  }
}