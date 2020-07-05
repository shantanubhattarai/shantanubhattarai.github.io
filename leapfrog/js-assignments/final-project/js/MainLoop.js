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
  },
  getTileWalkable(tileX, tileY){
    return this.layers.reduce((res, layer, index) => {
      var tile = this.getTile(index, tileX, tileY)
        var walkableLevel = 1;
        if(tile == 2 || tile == 3){
          walkableLevel = 2; //air, infantry and mech, one tile less movement, no water
        }else if(tile == 5 || 7){
          walkableLevel = 3; //air, infantry and mech, one movement max, no water
        }else if(tile == 28 || tile == 29){
          walkableLevel = 5; //air only
        }else if(tile == 155 || tile == 134 || tile == 137){
          walkableLevel = 4; //water and air only
        }
    });
  }
}
let selectedUnit;

const mainSpriteSheet = document.createElement('img');
mainSpriteSheet.src=('./img/UnitMap.png');

const token = 0;

const actionState = {
  current: 0,
  prepareMove: 1,
  move: 2,
  fire: 3,
  end: 4,
  idle: 5
}

class Unit{
  constructor(tileX, tileY, range){
    this.tileX = tileX;
    this.tileY = tileY;
    this.range = 3;
    this.x = (this.tileX - 1) * mainMap.tsize;
    this.y = (this.tileY - 1) * mainMap.tsize;
    this.drawGrid = false;
    this.count = 0;
    this.movementGrid = [];
    this.toMoveTotileX = 0;
    this.toMoveTotileY = 0;
  }

  isArrayinArray(arr, item){
    var itemAsString = JSON.stringify(item);
    var contains = arr.some((value) => {
      return JSON.stringify(value) === itemAsString;
    });
    return contains;
  }

  generateMovementTiles(startX, startY, count){
    let xyOffsets = [[0,0], [-1, 0], [1,0], [0, -1], [0,1]];
    let i = 0;
    let j = 0;
    count--;
    xyOffsets.forEach((value) => {
      i = startX + value[0];
      j = startY + value[1];
      if(!this.isArrayinArray(this.movementGrid, [i,j])) this.movementGrid.push([i,j]);
      if(count > 0){
        this.generateMovementTiles(i, j, count);
      }
    });
  }

  drawMovementTiles(x, y, context){
    context.fillStyle = 'rgba(255,255,255, 0.5)';
    context.beginPath();
    context.rect((x-1) * mainMap.tsize, (y-1) * mainMap.tsize, mainMap.tsize, mainMap.tsize);
    context.fill();
    context.closePath();
  }

  draw(context){
    if(this.drawGrid == true){
      this.movementGrid.forEach((value) => {
        this.drawMovementTiles(value[0], value[1], context);
      })
    }
    context.drawImage(mainSpriteSheet, 3, 104, mainMap.tsize, mainMap.tsize, this.x, this.y, mainMap.tsize, mainMap.tsize);
  }

  getTilePos(){
    return {tileX: this.tileX, tileY: this.tileY};
  }

  startMovement = () => {
    this.drawGrid = true;
    this.generateMovementTiles(this.tileX, this.tileY, this.range);
  }

  update = () => {
    if(actionState.current == actionState.move && selectedUnit == this){
      if(this.x < (this.toMoveTotileX-1) * mainMap.tsize){
        this.x += 1;
      }else if(this.x > (this.toMoveTotileX - 1) * mainMap.tsize){
        this.x -= 1;
      }else if(this.y < (this.toMoveTotileY - 1) * mainMap.tsize){
        this.y += 1;
      }else if(this.y > (this.toMoveTotileY - 1) * mainMap.tsize){
        this.y -= 1;
      }else{
        this.tileX = this.toMoveTotileX;
        this.tileY = this.toMoveTotileY;
        this.drawGrid = false;
        this.movementGrid = [];
        this.count = 0;
        actionState.current = actionState.fire;
      }
    }
  }

  moveTo(tileX, tileY){
    this.toMoveTotileX = tileX;
    this.toMoveTotileY = tileY;
    actionState.current = actionState.move;
    if(Math.abs(tileX - this.tileX) > this.range || Math.abs(tileY - this.tileY) > this.range){
      this.drawGrid = false;
      this.movementGrid = [];
      this.count = 0;
      actionState.current = actionState.idle;
      return;
    }
  }
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
    this.canvas.addEventListener('click', (e) => {
      let rect = self.canvas.getBoundingClientRect();
      let mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }

      let clickedTile = {
        tileX: Math.floor(mousePos.x / mainMap.tsize) + 1,
        tileY: Math.floor(mousePos.y / mainMap.tsize) + 1
      };

      if(actionState.current == actionState.prepareMove){
        selectedUnit.moveTo(clickedTile.tileX, clickedTile.tileY);
      }else{
        playerList.forEach((valueP) => {
          valueP.unitList.forEach((valueU) => {
            if(valueU.getTilePos().tileX == clickedTile.tileX && valueU.getTilePos().tileY == clickedTile.tileY){
              valueU.startMovement(this.context);
              actionState.current = actionState.prepareMove;
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
    playerList.forEach((valueP)=>{
      valueP.unitList.forEach((valueU) => {
        valueU.update();
      });
    });
  }

  init(){

  }

  render(){
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.drawLayer(0);
    this.drawLayer(1);
    player1.unitList[1].draw(this.context);
    player1.unitList[0].draw(this.context);
    this.update();
    window.requestAnimationFrame(this.render.bind(this));
  }
}

const playerList = [];

let player1 = new Player();
playerList.push(player1);
window.onload = () => {
  let mainGameLoop = new MainGameLoop();
}
