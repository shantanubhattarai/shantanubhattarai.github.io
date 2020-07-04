const mainMap = {
  cols: 32,
  rows: 28,
  tsize: 17,
  gap: 1,
  layers: [[
    1,1,1 ,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,4,1,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,4 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,4,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,4,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,6,27,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
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
    1,6,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ],
  [
    134 ,157 ,2  ,2,0  ,0  ,0  ,2,7  ,7  ,7  ,5,2,0,2,2,5,7 ,7 ,2,2,2,0,2,5,7,7,7,2,2,155 ,134,
    157 ,2   ,2  ,2,500,500,0  ,2,29 ,29 ,28 ,2,0,0,0,0,2,29,28,2,0,0,0,0,2,29,28,28,2,2,2,155,
    2   ,2   ,0  ,0,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    2   ,0   ,0  ,0,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    0   ,0   ,0  ,0,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    2   ,0   ,0  ,0,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    7   ,0   ,0  ,0,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    29  ,28  ,28 ,0,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    28  ,2   ,2  ,0,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    2   ,0   ,0  ,0,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    2   ,0   ,0  ,0,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    2   ,0   ,0  ,0,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    2   ,2   ,0  ,0,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    0   ,2   ,2  ,2,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    0   ,0   ,0  ,2,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    0   ,0   ,0  ,5,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    0   ,0   ,2  ,2,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    2   ,2   ,0  ,0,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    2   ,0   ,0  ,0,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    2   ,0   ,0  ,0,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    5   ,0   ,2  ,0,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    29  ,28  ,2  ,2,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    28  ,2   ,0  ,2,2  ,0  ,0  ,0,0  ,0  ,0  ,2,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    2   ,0   ,0  ,0,0  ,0  ,0  ,0,0  ,0  ,2  ,2,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    2   ,2   ,0  ,0,2  ,2  ,0  ,0,0  ,2  ,7  ,5,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    2   ,2   ,0  ,0,0  ,2  ,2  ,2,7  ,7  ,28 ,2,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    0   ,2   ,2  ,0,2  ,2  ,7  ,2,29 ,29 ,29 ,0,0,0,0,2,2,2 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
    0   ,0   ,0  ,2,5  ,5  ,28 ,5,28 ,28 ,28 ,2,2,2,2,2,2,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0
  ]
],
  getTile: function(layer, col,row){
    return this.layers[layer][row * this.cols + col];
  }
}
let selectedUnit;

const mainSpriteSheet = document.createElement('img');
mainSpriteSheet.src=('./img/UnitMap.png');

class Unit{
  constructor(tileX, tileY, range){
    this.tileX = tileX;
    this.tileY = tileY;
    this.range = range;
    this.x = (this.tileX - 1) * mainMap.tsize;
    this.y = (this.tileY - 1) * mainMap.tsize;
  }

  draw(context){
    context.drawImage(mainSpriteSheet, 3, 104, mainMap.tsize, mainMap.tsize, this.x, this.y, mainMap.tsize, mainMap.tsize);
  }

  getTilePos(){
    return {tileX: this.tileX, tileY: this.tileY};
  }

  moveTo(tileX, tileY){
    this.tileX = tileX;
    this.tileY = tileY;
    //this is temporary, change it.
    var movementInterval = setInterval(() => {
      if(this.x < (tileX-1) * mainMap.tsize){
        this.x += 1;
      }else if(this.x > (tileX - 1) * mainMap.tsize){
        this.x -= 1;
      }else if(this.y < (tileY - 1) * mainMap.tsize){
        this.y += 1;
      }else if(this.y > (tileY - 1) * mainMap.tsize){
        this.y -= 1;
      }
      else{
        clearInterval(movementInterval);
      }
    }, 1);

    // this.x = (tileX-1) * mainMap.tsize;
    // this.y = (tileY-1) * mainMap.tsize;
    actionState.current = actionState.fire;
  }
}

const actionState = {
  current: 0,
  move: 1,
  fire: 2,
  end: 3
}

class Player{
  constructor(){
    this.unitList = [];
    let newUnit = new Unit(5,5, 5);
    this.unitList.push(newUnit);
    let newUnit2 = new Unit(5,6, 3);
    this.unitList.push(newUnit2);
  }
}


class MainGameLoop{
  constructor(){
    let self = this;
    this.mapTilesImage = document.createElement('img');
    this.mapTilesImage.src = './img/RoadTiles.png';
    this.canvas = document.querySelector('canvas');
    this.canvas.width = mainMap.cols * mainMap.tsize;
    this.canvas.height = mainMap.rows * mainMap.tsize;
    this.context = this.canvas.getContext('2d');
    this.render();

    //use mousemove for hover
    this.canvas.addEventListener('click', function(e){
      let rect = self.canvas.getBoundingClientRect();
      let mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }

      let clickedTile = {
        tileX: Math.floor(mousePos.x / mainMap.tsize) + 1,
        tileY: Math.floor(mousePos.y / mainMap.tsize) + 1
      };

      if(actionState.current == actionState.move){
        selectedUnit.moveTo(clickedTile.tileX, clickedTile.tileY);
      }else{
        playerList.forEach(function(valueP){
          valueP.unitList.forEach(function(valueU){
            if(valueU.getTilePos().tileX == clickedTile.tileX && valueU.getTilePos().tileY == clickedTile.tileY){
              actionState.current = actionState.move;
              selectedUnit = valueU;
            }
          });
        });
      }

    });
  }

  drawLayer(layer){
    for(let c = 0; c < mainMap.cols; c++){
      for (let r = 0; r < mainMap.rows; r++){
        var tile = mainMap.getTile(layer, c, r);
        if (tile !== 0){
          this.context.drawImage(
            this.mapTilesImage,
            (tile > 22) ? (tile % 22 - 1) * mainMap.tsize : (tile - 1) * mainMap.tsize,
            (tile > 22) ? Math.floor(tile/22) * mainMap.tsize : 0,
            mainMap.tsize,
            mainMap.tsize,
            c * (mainMap.tsize),
            r * (mainMap.tsize),
            mainMap.tsize,
            mainMap.tsize
          );
        }
      }
    }
  }

  update(){

  }

  init(){

  }

  render(){
    this.drawLayer(0);
    this.drawLayer(1);
    player1.unitList[1].draw(this.context);
    player1.unitList[0].draw(this.context);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

const playerList = [];

let player1 = new Player();
playerList.push(player1);
window.onload = () => {
  let mainGameLoop = new MainGameLoop();
}
