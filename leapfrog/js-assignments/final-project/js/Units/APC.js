class APC extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.walkableLevel = 1;
    this.range = 3;
    this.type = 'APC';
    this.attack = -1;
    this.loadGrid = [];
    this.dropGrid = [];
    this.loadedUnit = '';
    this.damageMatrix = {
    };
    this.spritePos = {
      red: {
        idle: {
          0: {x: 3, y: 370},
          1: {x: 20, y: 370},
          2: {x: 37, y: 370},
          3: {x: 20, y: 370}
        },
        move:{
          0: {x: 3, y: 370},
          1: {x: 20, y: 370},
          2: {x: 37, y: 370},
          3: {x: 20, y: 370}
        }
      },
      blue: {
        idle: {
          0: {x: 392, y: 370},
          1: {x:409,y: 370},
          2: {x: 426, y: 370},
          3: {x:409,y: 370}
        },
        move:{
          0: {x: 392, y: 370},
          1: {x:409,y: 370},
          2: {x: 426, y: 370},
          3: {x:409,y: 370}
        }
      },
      green: {
        idle: {
          0: {x: 3, y: 672},
          1: {x: 20,y: 672},
          2: {x: 37, y: 672},
          3: {x: 20,y: 672}
        },
        move:{
          0: {x: 3, y: 672},
          1: {x: 20,y: 672},
          2: {x: 37, y: 672},
          3: {x: 20,y: 672}
        }
      },
      yellow: {
        idle: {
          0: {x: 392, y: 672},
          1: {x:409,y: 672},
          2: {x: 426, y: 672},
          3: {x:409,y: 672}
        },
        move:{
          0: {x: 392, y: 672},
          1: {x:409,y: 672},
          2: {x: 426, y: 672},
          3: {x:409,y: 672}
        }
      },
      redInactive: {x: 339,y: 370},
      blueInactive: {x: 728,y: 370},
      greenInactive: {x: 339,y: 672},
      yellowInactive: {x: 728, y: 672}
    }
  }

  generateLoadTiles = () => {
    this.loadGrid = [];
    let xyOffsets = [[-1, 0], [1,0], [0, -1], [0,1]];
    let i = 0;
    let j = 0;
    xyOffsets.forEach((value) => {
      i = this.tileX + value[0];
      j = this.tileY + value[1];
      this.loadGrid.push([i,j]);
    });
  }

  drawLoadTiles(x, y, context){
    context.fillStyle = 'rgba(180,120,0, 0.4)';
    context.strokeStyle = 'rgba(180,180,0,0.8)';
    context.beginPath();
    context.rect((x-1) * mainMap.tsize, (y-1) * mainMap.tsize, mainMap.tsize, mainMap.tsize);
    context.fill();
    context.stroke();
    context.closePath();
  }

  loadUnit(unitToLoad){
    this.loadedUnit = unitToLoad;
    this.loadedUnit.drawState = false;
    this.loadedUnit.tileX = -1;
    this.loadedUnit.tileY = -1;
    this.loadGrid = [];
    if(this.loadedUnit.current !== this.loadedUnit.actionState.inactive){
      this.loadedUnit.current = this.loadedUnit.actionState.inactive;
      currentPlayer.increaseCounter();
    }
    this.actionState.current = this.actionState.inactive;
    currentPlayer.increaseCounter();
  }

  generateDropTiles = () => {
    this.dropGrid = [];
    let xyOffsets = [[-1, 0], [1,0], [0, -1], [0,1]];
    let i = 0;
    let j = 0;
    xyOffsets.forEach((value) => {
      i = this.tileX + value[0];
      j = this.tileY + value[1];
      console.log(!mainMap.getTileHasUnit(i, j));
      if(
        (mainMap.getTileWalkable(i-1, j-1) !== 4 || mainMap.getTileWalkable(i-1, j-1) !== 5)
        && mainMap.getTileWalkable(i-1, j-1) <= this.loadedUnit.walkableLevel
        && !mainMap.getTileHasUnit(i, j)
      ){
        this.dropGrid.push([i,j]);
      }
    });
  }

  drawDropTiles(x, y, context){
    context.fillStyle = 'rgba(180,120,0, 0.4)';
    context.strokeStyle = 'rgba(180,180,0,0.8)';
    context.beginPath();
    context.rect((x-1) * mainMap.tsize, (y-1) * mainMap.tsize, mainMap.tsize, mainMap.tsize);
    context.fill();
    context.stroke();
    context.closePath();
  }

  dropUnit(clickedTile){
    this.dropGrid = [];
    this.loadedUnit.tileX = clickedTile.tileX;
    this.loadedUnit.tileY = clickedTile.tileY;
    this.loadedUnit.x = (clickedTile.tileX-1) * mainMap.tsize;
    this.loadedUnit.y = (clickedTile.tileY-1) * mainMap.tsize;
    this.loadedUnit.actionState.current = this.loadedUnit.actionState.inactive;
    currentPlayer.increaseCounter();
    this.loadedUnit.drawState =  true;
    this.actionState.current = this.actionState.inactive;
    currentPlayer.increaseCounter();
  }

};