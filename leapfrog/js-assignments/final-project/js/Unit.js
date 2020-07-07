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
    this.attackGrid = [];
    this.toMoveTotileX = 0;
    this.toMoveTotileY = 0;
    this.walkableLevel = walkableLevel;
    this.movementPath = [];
    this.nodeCount = 0;
    this.actionCount = 0;
    this.color = color;
    this.actionState = {
      current: 1,
      idle: 1,
      prepareMove: 2,
      move: 3,
      selectingAction: 4,
      prepareFire: 5,
      fire: 6,
      inactive: 7
    }
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
        if(newMoveCost == 9) {count = 1; newMoveCost = 1;} //for reducing movement to 1 immediately. hills.
        let newCount = count;
        if(!mainMap.getTileHasOpposingPlayer(i, j) && mainMap.getTileWalkable(i-1, j-1) <= this.walkableLevel){
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

  generateAttackTiles(){
    // add more offsets for different ranges
    let xyOffsets = [[-1, 0], [1,0], [0, -1], [0,1]];
    let i = 0;
    let j = 0;
    xyOffsets.forEach((value) => {
      i = this.tileX + value[0];
      j = this.tileY + value[1];
      this.attackGrid.push([i,j]);
    });
  }

  drawMovementTiles(x, y, context){
    context.fillStyle = 'rgba(255,255,255, 0.5)';
    context.beginPath();
    context.rect((x-1) * mainMap.tsize, (y-1) * mainMap.tsize, mainMap.tsize, mainMap.tsize);
    context.fill();
    context.closePath();
  }

  drawAttackTiles(x, y, context){
    context.fillStyle = 'rgba(255,0,0, 0.4)';
    context.strokeStyle = 'rgba(255,0,0,0.8)';
    context.beginPath();
    context.rect((x-1) * mainMap.tsize, (y-1) * mainMap.tsize, mainMap.tsize, mainMap.tsize);
    context.fill();
    context.stroke();
    context.closePath();
  }

  draw(context){
    if(this.drawGrid == true){
      this.movementGrid.forEach((value) => {
        this.drawMovementTiles(value[0], value[1], context);
      })
    }
    if(this.drawAttackGrid == true){
      this.attackGrid.forEach((value) => {
        this.drawAttackTiles(value[0], value[1], context);
      });
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

  startAttack = () => {
    this.drawAttackGrid = true;
    this.generateAttackTiles();
  }

  attack = (unitToAttack) => {
    if(!this.isArrayinArray(this.attackGrid, [unitToAttack.tileX, unitToAttack.tileY])){
      this.drawAttackGrid = false;
      this.attackGrid = [];
      this.actionState.current = this.actionState.selectingAction;
      return;
    }
    console.log(unitToAttack);
    this.drawAttackGrid = false;
    this.attackGrid = [];
    this.actionState.current = this.actionState.inactive;
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
      return !mainMap.getTileHasOpposingPlayer(value[0], value[1]) && mainMap.getTileWalkable(value[0]-1, value[1]-1) <= this.walkableLevel;
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
    if(this.actionState.current == this.actionState.move && selectedUnit == this){
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
        this.actionState.current = this.actionState.selectingAction;
        this.count = 0;
        this.nodeCount = 0;
        this.movementPath = [];
        // window.mainGameLoop.switchToken();
      }
    }

    if(this.actionState == this.actionState.fire && selectedUnit == this){
      //play fire animation
    }

  }

  moveTo = (tileX, tileY) => {
    if(!this.isArrayinArray(this.movementGrid, [tileX, tileY])){
      this.drawGrid = false;
      this.movementGrid = [];
      this.count = 0;
      this.actionState.current = this.actionState.idle;
      return;
    }

    this.toMoveTotileX = tileX;
    this.toMoveTotileY = tileY;
    this.actionState.current = this.actionState.move;
    this.pathfinder();
  }
}