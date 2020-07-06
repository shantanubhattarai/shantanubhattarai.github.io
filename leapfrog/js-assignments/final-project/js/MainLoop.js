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
    7   ,0   ,2  ,0,0  ,0  ,0  ,0,0  ,0  ,0  ,0,0,0,0,0,0,0 ,0 ,0,0,0,0,0,0,0,0,0,0,0,0   ,0  ,
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
      var tile = this.getTile(index, tileX, tileY);
        var walkableLevel = 1;
        if(tile == 2 || tile == 3){
          walkableLevel = 2; //air, infantry and mech, one tile less movement, no water
        }else if(tile == 5 || tile == 7){
          walkableLevel = 3; //air, infantry and mech, one movement max, no water
        }else if(tile == 28 || tile == 29){
          walkableLevel = 5; //air only
        }else if(tile == 155 || tile == 134 || tile == 137){
          walkableLevel = 4; //water and air only
        }
        return walkableLevel;
    });
  },
  getTileMoveCost(tileX, tileY){
    return this.layers.reduce(() => {
      if(this.getTileWalkable(tileX, tileY) == 2){
        return 2;
      }else{
        return 1;
      }
    });
  }
}
let selectedUnit;

const mainSpriteSheet = document.createElement('img');
mainSpriteSheet.src=('./img/UnitMap.png');

const actionState = {
  current: 0,
  prepareMove: 1,
  move: 2,
  fire: 3,
  end: 4,
  idle: 5
}

class Unit{
  constructor(tileX, tileY, range, walkableLevel, color){
    this.tileX = tileX;
    this.tileY = tileY;
    this.range = range;
    this.x = (this.tileX - 1) * mainMap.tsize;
    this.y = (this.tileY - 1) * mainMap.tsize;
    this.drawGrid = false;
    this.count = 0;
    this.movementGrid = [];
    this.toMoveTotileX = 0;
    this.toMoveTotileY = 0;
    this.walkableLevel = walkableLevel;
    this.movementPath = [];
    this.nodeCount = 0;
    this.color = color;
  }

  isArrayinArray(arr, item){
    var itemAsString = JSON.stringify(item);
    var contains = arr.some((value) => {
      return JSON.stringify([value[0],value[1]]) === itemAsString;
    });
    return contains;
  }

  isCountGreaterThanExisting(arr, item){
    var itemAsString = JSON.stringify([item[0], item[1]]);
    for(let i = 0; i < arr.length; i++){
      if(JSON.stringify([arr[i][0],arr[i][1]]) === itemAsString){
        return [i, (item[2] > arr[i][2])];
      }
    }
    return false;
  }


  generateMovementTiles(startX, startY, count, moveCost){
    let xyOffsets = [[0,0], [-1, 0], [1,0], [0, -1], [0,1]];
    let i = 0;
    let j = 0;
    let childrenGrid = [];
    if(moveCost <= count){
      xyOffsets.forEach((value) => {
        i = startX + value[0];
        j = startY + value[1];
        let newMoveCost = mainMap.getTileMoveCost(i-1, j-1);
        let newCount = count;
        if(mainMap.getTileWalkable(i-1, j-1) <= this.walkableLevel){
          if(childrenGrid.length > 0 && this.isCountGreaterThanExisting(childrenGrid, [i,j, newCount])[1]){
            childrenGrid[replaceArray[0]] = [i, j, newCount, newMoveCost];
          }
          if(this.isArrayinArray(this.movementGrid, [i,j])){
            let replaceArray = this.isCountGreaterThanExisting(this.movementGrid, [i, j, newCount]);
            if(replaceArray[1]){
              this.movementGrid[replaceArray[0]] = [i, j, newCount, newMoveCost];
            }
          }else{
            newCount -= newMoveCost;
            this.movementGrid.push([i,j, newCount, newMoveCost]);
            childrenGrid.push([i,j,newCount, newMoveCost]);
          }
        }
      });
      childrenGrid.forEach(element => {
        setTimeout(()=>{this.generateMovementTiles(element[0], element[1], element[2], element[3]);}, 0)
        //this.generateMovementTiles(element[0], element[1], element[2], element[3]);
      });
    }
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
    let spritePos = {
      red: {x: 3, y: 104},
      blue: {x: 392, y: 104},
      green: {x: 3, y: 672},
      yellow: {x: 392, y: 672}
    }
    context.drawImage(mainSpriteSheet, spritePos[this.color].x, spritePos[this.color].y, mainMap.tsize, mainMap.tsize, this.x, this.y, mainMap.tsize, mainMap.tsize);
  }

  getTilePos(){
    return {tileX: this.tileX, tileY: this.tileY};
  }

  startMovement = () => {
    this.drawGrid = true;
    this.generateMovementTiles(this.tileX, this.tileY, this.range, 0);
  }

  heuristic = (tileX, tileY) => {
    return Math.abs(tileX - this.toMoveTotileX) + Math.abs(tileY - this.toMoveTotileY);
  }

  getNeighbours = (current) =>{
    let results = [
      [current.x + 1, current.y], [current.x, current.y-1],
      [current.x - 1, current.y], [current.x, current.y+1]
    ];
    results = results.filter((value) => {
      return 0 < value[0] && 0 < value[1];
    });
    results = results.filter((value) => {
      return mainMap.getTileWalkable(value[0]-1, value[1]-1) <= this.walkableLevel;
    });
    return results;
  }

  pathfinder = () => {
    let frontier = new PriorityQueue();
    let start = {
      x: this.tileX,
      y: this.tileY
    }
    frontier.enqueue(start, 0);

    let came_from = [];
    came_from.push(start);
    while(!frontier.isEmpty()){
      let current = frontier.dequeue().element;
      this.movementPath.push(current);
      if (current.x == this.toMoveTotileX && current.y == this.toMoveTotileY){
        break;
      }

      let i = 0;
      let j = 0;
      this.getNeighbours(current).forEach((value) => {
        i = value[0];
        j = value[1];
        let thisPos = {x: i, y: j};
        if(came_from.length == 0 || !came_from.some(posCheck => (posCheck.x == thisPos.x && posCheck.y == thisPos.y))){
          let priority = this.heuristic(i, j);
          frontier.enqueue(thisPos, priority);
          came_from.push(thisPos);
        }
      });
    }
  }

  update = () => {
    if(actionState.current == actionState.move && selectedUnit == this){
      var newPos = {
        x: this.movementPath[this.nodeCount].x - this.tileX,
        y: this.movementPath[this.nodeCount].y - this.tileY
      };
      this.tileX += newPos.x * 1;
      this.tileY += newPos.y * 1;
      this.x = (this.tileX - 1) * mainMap.tsize;
      this.y = (this.tileY - 1) * mainMap.tsize;

      if(this.tileX == (this.movementPath[this.nodeCount].x)
      && this.tileY == (this.movementPath[this.nodeCount].y)) {
        if(this.nodeCount < this.movementPath.length - 1) this.nodeCount++;
      }
      if(
        this.tileX == this.toMoveTotileX &&
        this.tileY == this.toMoveTotileY
      ){
        this.drawGrid = false;
        this.movementGrid = [];
        actionState.current = actionState.fire;
        this.count = 0;
        this.nodeCount = 0;
        this.movementPath = [];
      }
    }
  }

  moveTo = (tileX, tileY) => {
    if(!this.isArrayinArray(this.movementGrid, [tileX, tileY])){
      this.drawGrid = false;
      this.movementGrid = [];
      this.count = 0;
      actionState.current = actionState.idle;
      return;
    }

    this.toMoveTotileX = tileX;
    this.toMoveTotileY = tileY;
    actionState.current = actionState.move;
    this.pathfinder();
  }
}

class Infantry extends Unit{
  constructor(tileX, tileY, range, walkableLevel, color){
    super(tileX, tileY, range, walkableLevel, color);
  }
};

class Player{
  constructor(color){
    this.unitList = [];
    this.active = true;
    this.color = color;
  }
  addUnit(tileX, tileY, range, walkableLevel){
    let newUnit = new Infantry(tileX, tileY, range, walkableLevel, this.color);
    this.unitList.push(newUnit);
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
    this.token = 0;
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
          if(valueP.active){
            valueP.unitList.forEach((valueU) => {
              if(valueU.getTilePos().tileX == clickedTile.tileX && valueU.getTilePos().tileY == clickedTile.tileY){
                  valueU.startMovement(this.context);
                  actionState.current = actionState.prepareMove;
                  selectedUnit = valueU;
              }
            });
          }
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
    playerList.forEach((valueP, index)=>{
      if(this.token !== undefined && this.token != index){
        console.log(this.token);
        valueP.active = false;
      }
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
    playerList.forEach(player => {
      player.unitList.forEach(unit => unit.draw(this.context));
    })
    this.update();
    window.requestAnimationFrame(this.render.bind(this));
  }
}

const playerList = [];

let player1 = new Player('red');
playerList.push(player1);
player1.addUnit(5,5,3,3);
let player2 = new Player('blue');
playerList.push(player2);
player2.addUnit(10,5,3,3);
window.onload = () => {
  let mainGameLoop = new MainGameLoop();
}
