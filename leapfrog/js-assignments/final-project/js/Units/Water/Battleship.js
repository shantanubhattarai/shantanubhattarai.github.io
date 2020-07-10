class Battleship extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.walkableLevel = 4;
    this.range = 5;
    this.type='Battleship';
    this.attackType = 'battleship';
    this.damageMatrix = {
      'Infantry' : 90,
      'Mech': 90,
      'Recon': 90,
      'APC': 80,
      'Anti Air': 90,
      'Tank': 80,
      'MD Tank': 60,
      'Artillery': 80,
      'Rocket Launcher': 90,
      'Missile Launcher': 90,
      'Battleship': 50,
      'Cruiser': 90,
    };
    this.spritePos = {
      red: {
        idle: {
          0: {x: 3, y: 541},
          1: {x: 20, y: 541},
          2: {x: 37, y: 541},
          3: {x: 20, y: 541}
        },
        move:{
          0: {x: 3, y: 541},
          1: {x: 20, y: 541},
          2: {x: 37, y: 541},
          3: {x: 20, y: 541}
        }
      },
      blue: {
        idle: {
          0: {x: 392, y: 541},
          1: {x:409,y: 541},
          2: {x: 426, y: 541},
          3: {x:409,y: 541}
        },
        move:{
          0: {x: 392, y: 541},
          1: {x:409,y: 541},
          2: {x: 426, y: 541},
          3: {x:409,y: 541}
        }
      },
      green: {
        idle: {
          0: {x: 3, y: 1109},
          1: {x: 20, y: 1109},
          2: {x: 37, y: 1109},
          3: {x: 20, y: 1109}
        },
        move:{
          0: {x: 3, y: 1109},
          1: {x: 20, y: 1109},
          2: {x: 37, y: 1109},
          3: {x: 20, y: 1109}
        }
      },
      yellow: {
        idle: {
          0: {x: 392, y: 1109},
          1: {x:409,y: 1109},
          2: {x: 426, y: 1109},
          3: {x:409,y: 1109}
        },
        move:{
          0: {x: 392, y: 1109},
          1: {x:409,y: 1109},
          2: {x: 426, y: 1109},
          3: {x:409,y: 1109}
        }
      },
      redInactive: {x: 339,y: 541},
      blueInactive: {x: 728,y: 541},
      greenInactive: {x: 339,y: 1128},
      yellowInactive: {x: 728, y: 1128}
    }
  }

  generateAttackTiles(){
    this.attackGrid = [];
    let xyOffsets = [
      [ 5, 0],[-5, 0],[ 0, 5],[ 0,-5],
      [ 4, 0],[-4, 0],[ 0, 4],[ 0,-4],
      [ 4, 1],[-4, 1],[ 1, 4],[ 1,-4],
      [ 4,-1],[-4,-1],[-1, 4],[-1,-4],
      [ 3, 0],[-3, 0],[ 0, 3],[ 0,-3],
      [ 3, 1],[-3, 1],[ 1, 3],[ 1,-3],
      [ 3, 2],[-3, 2],[ 2, 3],[ 2,-3],
      [ 3,-1],[-3,-1],[-1, 3],[-1,-3],
      [ 3,-2],[-3,-2],[-2, 3],[-2,-3],
      [-2, 0],[ 2, 0],[ 0, 2],[ 0,-2],
      [-2, 1],[ 2, 1],[ 1, 2],[ 1,-2],
      [-2, 2],[ 2, 2],[ 2,-2],[-2,-2],
      [ 2,-1],[-1,-2],[-2,-1],[-1, 2]
      ];
    let i = 0;
    let j = 0;
    xyOffsets.forEach((value) => {
      i = this.tileX + value[0];
      j = this.tileY + value[1];
      this.attackGrid.push([i,j]);
    });
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