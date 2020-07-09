const attackMatrix = {
  'Infantry':['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Helicopter','Anti Air','Missile Launcher','Rocket Launcher'],
  'Mech':['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Helicopter','Anti Air','Missile Launcher','Rocket Launcher'],
  'Tank':['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Helicopter','Anti Air','Missile Launcher','Rocket Launcher'],
  'MD Tank':['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Helicopter','Anti Air','Missile Launcher','Rocket Launcher'],
  'Recon':['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Helicopter','Anti Air','Missile Launcher','Rocket Launcher'],
  'Artillery':['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Helicopter','Anti Air','Missile Launcher','Rocket Launcher'],
  'Helicopter':['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Helicopter','fighter','Bomber','Anti Air','Missile Launcher','Rocket Launcher'],
  'Cruiser':['Infantry', 'Cruiser'],
  'Fighter':['Fighter', 'Helicopter', 'Bomber'],
  'Bomber':['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Anti Air','Missile Launcher','Rocket Launcher'],
};

let frames = 0;
let animationFrame = 0;

class Unit{
  constructor(tileX, tileY, color){
    this.tileX = tileX;
    this.tileY = tileY;
    this.range = 3;
    this.x = (this.tileX - 1) * mainMap.tsize;
    this.y = (this.tileY - 1) * mainMap.tsize;
    this.drawGrid = false;
    this.count = 0;
    this.movementGrid = [];
    this.attackGrid = [];
    this.toMoveTotileX = 0;
    this.toMoveTotileY = 0;
    this.walkableLevel = 5;
    this.movementPath = [];
    this.nodeCount = 0;
    this.actionCount = 2;
    this.color = color;
    this.hp = 10;
    this.damage = 10;
    this.counterDefense = 20;
    this.defense = 10;
    this.type = 'generic';
    this.actionState = {
      current: 1,
      idle: 1,
      prepareMove: 2,
      move: 3,
      selectingAction: 4,
      prepareFire: 5,
      fire: 6,
      inactive: 7,
      currentState: 'idle'
    };
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
        if(this.walkableLevel == 5) newMoveCost = 1;
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
    this.attackGrid = [];
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

  revertMove(){
    if(this.movementPath.length > 0){
      this.tileX = this.movementPath[0].x;
      this.tileY = this.movementPath[0].y;
    }
    this.movementPath = [];
    this.actionState.current = this.actionState.idle;
    this.actionState.currentState = 'idle';
    this.x = (this.tileX - 1) * mainMap.tsize;
    this.y = (this.tileY - 1) * mainMap.tsize;
    selectedUnit = undefined;
  }

  enemyInAttackTiles(){
    var enemyFound = false;
    this.attackGrid.forEach((valueT) => {
      playerList.forEach((valueP)=> {
        if(valueP.active == false){
          valueP.unitList.some((valueU) => {
            //check can attack interaction, air water and all that
            if(valueU.tileX == valueT[0] && valueU.tileY == valueT[1]){
              if(attackMatrix[this.type].includes(valueU.type)) enemyFound = true;
            }
          });
        }
      });
    });
    return enemyFound;
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
    if(this.actionState.current == this.actionState.inactive) {
      context.drawImage(mainSpriteSheet, this.spritePos[this.color + 'Inactive'].x, this.spritePos[this.color + 'Inactive'].y, mainMap.sourceSize-1, mainMap.sourceSize-1, this.x, this.y, mainMap.tsize, mainMap.tsize);
    }else{
      context.drawImage(mainSpriteSheet, this.spritePos[this.color][this.actionState.currentState][animationFrame].x, this.spritePos[this.color][this.actionState.currentState][animationFrame].y, mainMap.sourceSize-1, mainMap.sourceSize-1, this.x, this.y, mainMap.tsize, mainMap.tsize);
    }
    if(this.hp < 10 && this.hp > 0) context.drawImage(mainHUDSheet, hudPos[this.hp].x, hudPos[this.hp].y,8,8,this.x + mainMap.tsize - 12, this.y + mainMap.tsize - 12, 12, 12);
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
      this.movementPath = [];
      this.actionState.current = this.actionState.selectingAction;
      this.actionState.currentState = 'idle';
      return;
    }
    let modifiedDamage = this.damage * this.hp/10 < 1? 1 : this.damage * this.hp/10;
    if(unitToAttack.isVehicle == 1) modifiedDamage = modifiedDamage * this.vehicleAttackModifier/100;
    unitToAttack.takeDamage(modifiedDamage);
    unitToAttack.counterAttack(this);
    this.drawAttackGrid = false;
    this.attackGrid = [];
    this.movementPath = [];
    this.actionState.current = this.actionState.inactive;
    this.actionState.currentState = 'inactive';
  }

  counterAttack = (unitToAttack) => {
    if(this.attackGrid.length == 0) this.generateAttackTiles();
    if(!this.isArrayinArray(this.attackGrid, [unitToAttack.tileX, unitToAttack.tileY])){
      return;
    }
    let modifiedDamage = this.damage * this.hp/10 < 1? 1 : this.damage * this.hp/10;
    if(unitToAttack.isVehicle == 1) modifiedDamage = modifiedDamage * this.vehicleAttackModifier/100;
    unitToAttack.takeDamage(modifiedDamage, 1);
  }

  takeDamage = (damage, counter = 0) => {
    let modifiedDamage= damage - this.defense * damage / 100 - counter * this.counterDefense * damage /100;
    modifiedDamage = modifiedDamage < 0 ? 0 : modifiedDamage;
    this.hp -= modifiedDamage;
    this.hp = Math.round(this.hp);
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
      let distanceX = (this.movementPath[this.nodeCount].x-1) * mainMap.tsize - this.x;
      let distanceY = (this.movementPath[this.nodeCount].y-1) * mainMap.tsize - this.y;
      let distance = Math.abs(distanceX + distanceY);
      if(this.x !== (this.movementPath[this.nodeCount].x-1) * mainMap.tsize || this.y !== (this.movementPath[this.nodeCount].y-1) * mainMap.tsize){
        this.x += distance == 0 ? 2 :distanceX/distance * 2;
        this.y += distance == 0 ? 2 :distanceY/distance * 2;
      }else{
        this.tileX += newPos.x;
        this.tileY += newPos.y;

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
          this.actionState.currentState = 'idle';
          this.count = 0;
          this.nodeCount = 0;
        }
      }
      }


    if(this.actionState == this.actionState.fire && selectedUnit == this){
      //play fire animation
    }
  }

  moveTo = (tileX, tileY) => {
    if(!this.isArrayinArray(this.movementGrid, [tileX, tileY]) || currentPlayer.isUnitOnTile(tileX, tileY)){
      this.drawGrid = false;
      this.movementGrid = [];
      this.count = 0;
      this.actionState.current = this.actionState.idle;
      this.actionState.currentState = 'idle';
      return;
    }

    this.toMoveTotileX = tileX;
    this.toMoveTotileY = tileY;
    this.actionState.current = this.actionState.move;
    this.actionState.currentState = 'move';
    this.pathfinder();
  }
}