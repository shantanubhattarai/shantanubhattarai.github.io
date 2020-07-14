class TransportCopter extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.walkableLevel = 5;
    this.range = 3;
    this.type = 'Transport Copter';
    this.attackType = 'normal';
    this.attack = -1;
    this.loadGrid = [];
    this.dropGrid = [];
    this.loadedUnit = '';
    this.damageMatrix = {
    };
    this.spritePos = {
      red: {
        idle: {
          0: {x: 3, y: 522},
          1: {x: 20, y: 522},
          2: {x: 37, y: 522},
          3: {x: 20, y: 522}
        },
        move:{
          0: {x: 3, y: 522},
          1: {x: 20, y: 522},
          2: {x: 37, y: 522},
          3: {x: 20, y: 522}
        }
      },
      blue: {
        idle: {
          0: {x: 392, y: 522},
          1: {x:409,y: 522},
          2: {x: 426, y: 522},
          3: {x:409,y: 522}
        },
        move:{
          0: {x: 392, y: 522},
          1: {x:409,y: 522},
          2: {x: 426, y: 522},
          3: {x:409,y: 522}
        }
      },
      green: {
        idle: {
          0: {x: 3, y: 1090},
          1: {x: 20,y: 1090},
          2: {x: 37, y: 1090},
          3: {x: 20,y: 1090}
        },
        move:{
          0: {x: 3, y: 1090},
          1: {x: 20,y: 1090},
          2: {x: 37, y: 1090},
          3: {x: 20,y: 1090}
        }
      },
      yellow: {
        idle: {
          0: {x: 392, y: 1090},
          1: {x:409,y: 1090},
          2: {x: 426, y: 1090},
          3: {x:409,y: 1090}
        },
        move:{
          0: {x: 392, y: 1090},
          1: {x:409,y: 1090},
          2: {x: 426, y: 1090},
          3: {x:409,y: 1090}
        }
      },
      redInactive: {x: 339,y: 522},
      blueInactive: {x: 728,y: 522},
      greenInactive: {x: 339,y: 1090},
      yellowInactive: {x: 728, y: 1090}
    }
  }

  /**
   * Generates tiles to represent range for carrying other units
   */
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

  /**
   * Draws rectangles to indicate load tiles
   * @param x x position to draw tile on
   * @param y y position to draw tile on
   * @param context context to draw in
   */
  drawLoadTiles(x, y, context){
    context.fillStyle = 'rgba(180,120,0, 0.4)';
    context.strokeStyle = 'rgba(180,180,0,0.8)';
    context.beginPath();
    context.rect((x-1) * mainMap.tsize, (y-1) * mainMap.tsize, mainMap.tsize, mainMap.tsize);
    context.fill();
    context.stroke();
    context.closePath();
  }

  /** loads unit into this unit
   * @param unitToLoad - unit to carry in this unit
   */
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

  /**
   * Generates tiles to represent where loaded unit can be dropped
   */
  generateDropTiles = () => {
    this.dropGrid = [];
    let xyOffsets = [[-1, 0], [1,0], [0, -1], [0,1]];
    let i = 0;
    let j = 0;
    xyOffsets.forEach((value) => {
      i = this.tileX + value[0];
      j = this.tileY + value[1];
      console.log(!mainMap.getTileHasUnit(i-1, j-1));
      if(
        (mainMap.getTileWalkable(i-1, j-1) !== 4 || mainMap.getTileWalkable(i-1, j-1) !== 5)
        && mainMap.getTileWalkable(i-1, j-1) <= this.loadedUnit.walkableLevel
        && !mainMap.getTileHasUnit(i-1, j-1)
      ){
        this.dropGrid.push([i,j]);
      }
    });
  }

 /** Draws generated drop tiles
   * @param x  x position to draw tile in
   * @param y y position to draw tile in
   * @param context context to draw tile in
   */
  drawDropTiles(x, y, context){
    context.fillStyle = 'rgba(180,120,0, 0.4)';
    context.strokeStyle = 'rgba(180,180,0,0.8)';
    context.beginPath();
    context.rect((x-1) * mainMap.tsize, (y-1) * mainMap.tsize, mainMap.tsize, mainMap.tsize);
    context.fill();
    context.stroke();
    context.closePath();
  }

  /** Drops unit at clicked Tile
   * @param clickedTile position of clicked tile
   */
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