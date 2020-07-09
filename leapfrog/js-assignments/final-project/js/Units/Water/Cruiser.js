class Cruiser extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.walkableLevel = 4;
    this.damage = 10;
    this.counterModifier = 50;
    this.vehicleAttackModifier = 100;
    this.defense = 20;
    this.range = 5;
    this.vehicle = 1;
    this.type='Cruiser';
    this.spritePos = {
      red: {x: 3, y: 560},
      blue: {x: 392, y: 560},
      green: {x: 3, y: 672},
      yellow: {x: 392, y: 672},
      redInactive: {x: 339,y: 560},
      blueInactive: {x: 728,y: 560},
      greenInactive: {x: 339,y: 672},
      yellowInactive: {x: 728, y: 672}
    }
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
        if (this.walkableLevel == 4){
          if(mainMap.getTileWalkable(i-1, j-1) == 4){
            if(!mainMap.getTileHasOpposingPlayer(i, j)){
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
          }
        }
      });
      childrenGrid.forEach(element => {
        setTimeout(()=>{this.generateMovementTiles(element[0], element[1], element[2], element[3]);}, 0)
        //this.generateMovementTiles(element[0], element[1], element[2], element[3]);
      });
    }
  }
};