/** Defines which units can attack each other */
const attackMatrix = {
  'Infantry':['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Helicopter','Anti Air','Missile Launcher','Rocket Launcher', 'APC', 'Transport Copter'],
  'Mech':['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Helicopter','Anti Air','Missile Launcher','Rocket Launcher', 'APC', 'Transport Copter'],
  'Tank':['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Helicopter','Anti Air','Missile Launcher','Rocket Launcher','APC','Transport Copter','Cruiser','Battleship'],
  'MD Tank':['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Helicopter','Anti Air','Missile Launcher','Rocket Launcher','Cruiser', 'Battleship', 'Transport Copter'],
  'Recon':['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Helicopter','Anti Air','Missile Launcher','Rocket Launcher','APC','Transport Copter'],
  'Artillery':['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Helicopter','Anti Air','Missile Launcher','Rocket Launcher','APC','Cruiser','Battleship'],
  'Helicopter':['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Helicopter','Anti Air','Missile Launcher','Rocket Launcher','APC','Cruiser','Battleship','Transport Copter'],
  'Cruiser':['Transport Copter','Helicopter','Fighter','Bomber', 'Tank'],
  'Fighter':['Fighter', 'Helicopter', 'Bomber', 'Transport Copter'],
  'Bomber':['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Anti Air','Missile Launcher','Rocket Launcher', 'Cruiser', 'Battleship', 'APC'],
  'Missile Launcher': ['Transport Copter', 'Helicopter', 'Fighter', 'Bomber'],
  'Anti Air': ['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Helicopter','Anti Air','Missile Launcher','Rocket Launcher', 'APC', 'Transport Copter', 'Fighter', 'Bomber'],
  'Rocket Launcher': ['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Anti Air','Missile Launcher','Rocket Launcher','APC','Cruiser', 'Battleship'],
  'Battleship': ['Infantry','Mech','Tank','MD Tank','Artillery','Recon','Anti Air','Missile Launcher','Rocket Launcher','APC','Cruiser', 'Battleship'],
  'APC': [],
  'Transport Copter': []
};

/** Variables for idle, capture and battle animations */
let frames = 0;
let animationFrame = 0;
let fadeId = 0;
let battleID = 0;
let counterID = 0;

/** Declares a unit - interactable characters for each player
 * @param tileX which tile to spawn in  - X tile number
 * @param tileY which tile to spawn in - Y tile number
 * @param color which player to spawn for - takes 'red', 'blue', 'green' and 'yellow'
 */
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
    this.maxHP = 10;
    this.type = 'generic';
    this.drawState = true;
    this.captureCounter = 0;
    this.battleCounter = 0;
    this.counterAttackCounter = 0;
    this.captureAnimFrame = 0;
    this.battleAnimFrame = 0;
    this.actionState = {
      current: 1,
      idle: 1,
      prepareMove: 2,
      move: 3,
      selectingAction: 4,
      prepareFire: 5,
      fire: 6,
      prepareLoad: 7,
      prepareDrop: 8,
      inactive: 9,
      currentState: 'idle'
    };
    this.attackPhase = false;
    this.counterPhase = false;
    this.attackSprites = {
      left:{
        0: {x: 0, y: 394},
        1: {x: 48, y: 394},
        2: {x: 96, y: 394},
        3: {x: 144, y: 394},
      },
      right:{
        0: {x: 192, y: 494},
        1: {x: 144, y: 494},
        2: {x: 96, y: 494},
        3: {x: 48, y: 494},
      }
    };
    this.damageSprites = {
      0: {x: 0, y: 444},
      1: {x: 32, y: 444},
      2: {x: 64, y: 444},
      3: {x: 96, y: 444}
    }
  }

  /** returns true if array is inside another array
   * @param arr - array to search inside
   * @param item - array to search for in arr
   */
  isArrayinArray(arr, item){
    var itemAsString = JSON.stringify(item);
    var contains = arr.some((value) => {
      return JSON.stringify([value[0],value[1]]) === itemAsString;
    });
    return contains;
  }


  /** returns true if possible movement from already generated tile is greater than this  new tile
   * @param arr - array of already generated tiles
   * @param item - new tile to generate
   */
  isCountGreaterThanExisting(arr, item){
    var itemAsString = JSON.stringify([item[0], item[1]]);
    for(let i = 0; i < arr.length; i++){
      if(JSON.stringify([arr[i][0],arr[i][1]]) === itemAsString){
        return [i, (item[2] > arr[i][2])];
      }
    }
    return false;
  }

  /**
   * Generates possible movement tiles for selected unit
   * @param startX starting X tile of selected unit
   * @param startY starting Y tile of selected unit
   * @param count number of moves left from tile
   * @param moveCost movement cost for this unit on this tile
   */
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

  /** Generates attack tiles for selected unit */
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

  /** Checks if selected unit is standing on a self captured building */
  checkOnCapturedBuilding(){
    let capturedPositions = currentPlayer.capturedBuildings.map((value) => {
      return [value.tileX, value.tileY];
    });
    if(this.isArrayinArray(capturedPositions, [this.tileX, this.tileY])){
      this.increaseHP(2);
    }
  }

  /**Increases unit's HP
   * @param amount amount to increase HP by
   */
  increaseHP(amount){
    this.hp += amount;
    if(this.hp > this.maxHP) this.hp = this.maxHP;
  }

    /**Sets unit's HP
   * @param amount amount to set HP to
   */
  setHP(amount){
    this.hp = amount;
  }

  /** Draw rectangles to represent movement tiles
   * @param x x position to start drawing in
   * @param y y position to start drawing in
   * @param context context to draw in
   */
  drawMovementTiles(x, y, context){
    context.fillStyle = 'rgba(255,255,255, 0.5)';
    context.strokeStyle = 'rgba(255,255,255, 0.8)';
    context.beginPath();
    context.rect((x-1) * mainMap.tsize, (y-1) * mainMap.tsize, mainMap.tsize, mainMap.tsize);
    context.fill();
    context.stroke();
    context.closePath();
  }

  /** Draw rectangles to represent attack tiles
   * @param x x position to start drawing in
   * @param y y position to start drawing in
   * @param context context to draw in
   */
  drawAttackTiles(x, y, context){
    context.fillStyle = 'rgba(255,0,0, 0.4)';
    context.strokeStyle = 'rgba(255,0,0,0.8)';
    context.beginPath();
    context.rect((x-1) * mainMap.tsize, (y-1) * mainMap.tsize, mainMap.tsize, mainMap.tsize);
    context.fill();
    context.stroke();
    context.closePath();
  }

  /** Revert movement to starting position */
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

  /** Detect if there is enemy in selected unit's attack tiles */
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

  /**Starts capture animation */
  startCaptureAnimate = () => {
    capturingUnit = this;
    soundManager.playCapture();
    fadeId = setInterval(this.captureAnimate, 10);
  }

  /** Defines capture animation Timings*/
  captureAnimate = () => {
    this.captureCounter += 1;
    if(this.captureCounter % 8 == 0) this.captureAnimFrame++;
    if(this.captureAnimFrame > 3) this.captureAnimFrame = 0;
    if(this.captureCounter >= 114){
      clearInterval(fadeId);
      capturingUnit = undefined;
      this.captureCounter = 0;
    }
  }

  /** Draw necessary sprites for this unit, includes movement grid, attack grid, load grid, drop grid, idle animation */
  draw(context){
    if(!this.drawState){
      return;
    }
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
    if(this.loadGrid !== undefined && this.loadGrid.length > 0){
      this.loadGrid.forEach((value)=>{
        this.drawLoadTiles(value[0], value[1], context);
      });
    }
    if(this.dropGrid !== undefined && this.dropGrid.length > 0){
      this.dropGrid.forEach((value)=>{
        this.drawDropTiles(value[0], value[1], context);
      });
    }
    if(this.actionState.current == this.actionState.inactive) {
      context.drawImage(mainSpriteSheet, this.spritePos[this.color + 'Inactive'].x, this.spritePos[this.color + 'Inactive'].y, mainMap.sourceSize-1, mainMap.sourceSize-1, this.x, this.y, mainMap.tsize, mainMap.tsize);
    }else{
      context.drawImage(mainSpriteSheet, this.spritePos[this.color][this.actionState.currentState][animationFrame].x, this.spritePos[this.color][this.actionState.currentState][animationFrame].y, mainMap.sourceSize-1, mainMap.sourceSize-1, this.x, this.y, mainMap.tsize, mainMap.tsize);
    }
    if(this.hp < 10 && this.hp > 0) context.drawImage(mainHUDSheet, hudPos[this.hp].x, hudPos[this.hp].y,8,8,this.x + mainMap.tsize - 12, this.y + mainMap.tsize - 12, 12, 12);
    if(this.loadedUnit !== undefined && this.loadedUnit !== '') {
      context.drawImage(mainHUDSheet, 157,59,8,8,this.x, this.y + mainMap.tsize - 12, 12, 12);
    }
  }

  /** Defines Capture animation sprites */
  drawCapture(){
    if(this.captureCounter > 0){
      context.drawImage(captBG,240,200,240,300);
      context.drawImage(captAnimSheet, this.spritePos[this.color]['capture'][this.captureAnimFrame].x, this.spritePos[this.color]['capture'][this.captureAnimFrame].y, 16,24,260,220,200,280);
    }
  }

  /** Returns tile position of this unit */
  getTilePos(){
    return {tileX: this.tileX, tileY: this.tileY};
  }


  /** starts movement */
  startMovement = () => {
    this.drawGrid = true;
    this.generateMovementTiles(this.tileX, this.tileY, this.range, 0);
  }

  /** starts attack */
  startAttack = () => {
    this.drawAttackGrid = true;
    this.generateAttackTiles();
  }

  /** attack clicked unit
   * @param unitToAttack which unit to attack
  */
  attack = (unitToAttack) => {
    if(!this.isArrayinArray(this.attackGrid, [unitToAttack.tileX, unitToAttack.tileY])){
      this.drawAttackGrid = false;
      this.attackGrid = [];
      this.movementPath = [];
      this.actionState.current = this.actionState.selectingAction;
      this.actionState.currentState = 'idle';
      return;
    }
    let modifiedDamage = this.damageMatrix[unitToAttack.type] * this.hp/10 < 1? 1 : this.damageMatrix[unitToAttack.type] * this.hp/10;
    modifiedDamage = modifiedDamage / 100 * unitToAttack.maxHP;
    if(modifiedDamage > unitToAttack.hp) {currentPlayer.funds += 400};
    attackingUnit = this;
    defendingUnit = unitToAttack;
    battleID = setInterval(this.battleAnimate, 10, modifiedDamage, unitToAttack);
    this.drawAttackGrid = false;
    this.attackGrid = [];
    this.movementPath = [];
    this.actionState.current = this.actionState.inactive;
    this.actionState.currentState = 'inactive';
  }

  /** start battle animation
   * @param modifiedDamage amount of damage to inflict
   * @param unitToAttack which unit to attack
  */
  battleAnimate = (modifiedDamage, unitToAttack) => {
    this.battleCounter += 1;
    this.battlePhase = true;
    if(this.battleCounter % 16 == 0) this.battleAnimFrame++;
    if(this.battleAnimFrame > 3) this.battleAnimFrame = 0;
    if(this.battleCounter >= 184){
      clearInterval(battleID);
      attackingUnit = undefined;
      defendingUnit = undefined;
      this.battleCounter = 0;
      this.battleAnimFrame = 0;
      this.battlePhase = false;
      unitToAttack.takeDamage(modifiedDamage);
      if(unitToAttack.hp > 0) unitToAttack.counterAttack(this);
    }
  }

  /** start counter attack animation
   * @param modifiedDamage amount of damage to inflict
   * @param unitToAttack which unit to counter attack
  */
  counterAttackAnimate = (modifiedDamage, unitToAttack) => {
    this.battleCounter += 1;
    this.counterPhase = true;
    if(this.battleCounter % 16 == 0) this.battleAnimFrame++;
    if(this.battleAnimFrame > 3) this.battleAnimFrame = 0;
    if(this.battleCounter >= 184){
      clearInterval(counterID);
      attackingUnit = undefined;
      defendingUnit = undefined;
      this.battleCounter = 0;
      this.battleAnimFrame = 0;
      this.counterPhase = false;
      unitToAttack.takeDamage(modifiedDamage);
    }
  }

  /** inflict counter attack damage
   * @param unitToAttack which unit to attack
   */
  counterAttack = (unitToAttack) => {
    this.generateAttackTiles();
    if(!this.isArrayinArray(this.attackGrid, [unitToAttack.tileX, unitToAttack.tileY])){
      return;
    }
    if(this.damageMatrix[unitToAttack.type] == undefined){
      return;
    }
    let modifiedDamage = this.damageMatrix[unitToAttack.type] * this.hp/10 < 1? 1 : this.damageMatrix[unitToAttack.type] * this.hp/10;
    modifiedDamage = modifiedDamage / 100 * unitToAttack.maxHP;
    attackingUnit = this;
    defendingUnit = unitToAttack;
    counterID = setInterval(this.counterAttackAnimate, 10, modifiedDamage, unitToAttack);
    if(modifiedDamage > unitToAttack.hp) {currentPlayer.funds += 400};
  }

  /** Take damage
   * @param damage reduce unit's hp by damage
   */
  takeDamage = (damage) => {
    this.hp -= damage;
    this.hp = Math.round(this.hp);
  }

  /**
   * Heuristic function for pathfinding
   * @param tileX - x position of tile to find heuristics for
   * @param tileY - y position of tile to find heuristics for
   */
  heuristic = (tileX, tileY) => {
    return Math.abs(tileX - this.toMoveTotileX) + Math.abs(tileY - this.toMoveTotileY);
  }

  /** Get neighbouring tiles from current tile
   * @param current - current tile
   */
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
    results = results.filter((value) => {
      return this.isArrayinArray(this.movementGrid, value);
    });
    return results;
  }

  /** Finds path for player to walk on based on movement grid */
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

  /** Sets if the unit is to be drawn or not
   * @param drawState bool, true to draw unit, false to stop drawing unit
  */
  setDraw = (drawState) => {
    this.draw = drawState;
  }

  /** Updates unit position */
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
  }

  /** sets which tile to move to
   * @param tileX x position of tile to move to
   * @param tileY y position of tile to move to
   */
  moveTo = (tileX, tileY) => {
    if(!this.isArrayinArray(this.movementGrid, [tileX, tileY]) || currentPlayer.isUnitOnTile(tileX, tileY)){
      soundManager.playWrongSelect();
      this.drawGrid = false;
      this.movementGrid = [];
      this.count = 0;
      this.actionState.current = this.actionState.idle;
      this.actionState.currentState = 'idle';
      return;
    }
    soundManager.playSelect();
    this.toMoveTotileX = tileX;
    this.toMoveTotileY = tileY;
    this.actionState.current = this.actionState.move;
    this.actionState.currentState = 'move';
    this.pathfinder();
  }
}