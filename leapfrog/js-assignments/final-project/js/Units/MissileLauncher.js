class MissileLauncher extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 1;
    this.walkableLevel = 1;
    this.range = 3;
    this.type='Missile Launcher';
    this.damageMatrix = {
      'Transport Copter': 100,
      'Helicopter': 100,
      'Fighter': 100,
      'Bomber': 100
    };
    this.spritePos = {
      red: {
        idle: {
          0: {x: 3 , y: 446},
          1: {x: 20, y: 446},
          2: {x: 37, y: 446},
          3: {x: 20, y: 446}
        },
        move:{
          0: {x: 3 , y: 446},
          1: {x: 20, y: 446},
          2: {x: 37, y: 446},
          3: {x: 20, y: 446}
        }
      },
      blue: {
        idle: {
          0: {x: 392, y: 446},
          1: {x: 409, y: 446},
          2: {x: 426, y: 446},
          3: {x: 409, y: 446}
        },
        move:{
          0: {x: 392, y: 446},
          1: {x: 409, y: 446},
          2: {x: 426, y: 446},
          3: {x: 409, y: 446}
        }
      },
      green: {
        idle: {
          0: {x: 3 , y: 1014},
          1: {x: 20, y: 1014},
          2: {x: 37, y: 1014},
          3: {x: 20, y: 1014}
        },
        move:{
          0: {x: 3 , y: 1014},
          1: {x: 20, y: 1014},
          2: {x: 37, y: 1014},
          3: {x: 20, y: 1014}
        }
      },
      yellow: {
        idle: {
          0: {x: 392, y: 1014},
          1: {x: 409, y: 1014},
          2: {x: 426, y: 1014},
          3: {x: 409, y: 1014}
        },
        move:{
          0: {x: 392, y: 1014},
          1: {x: 409, y: 1014},
          2: {x: 426, y: 1014},
          3: {x: 409, y: 1014}
        }
      },
      redInactive: {x: 339,y: 446},
      blueInactive: {x: 728,y: 446},
      greenInactive: {x: 339,y: 1014},
      yellowInactive: {x: 728, y: 1014}
    }
  }

  generateAttackTiles(){
    // 3 to 5 for missiles
    this.attackGrid = [];
    let xyOffsets = [
      [5, 0],[-5, 0],[ 0,5],[ 0,-5],
      [4, 0],[-4, 0],[ 0,4],[ 0,-4],
      [4, 1],[-4, 1],[ 1,4],[ 1,-4],
      [4,-1],[-4,-1],[-1,4],[-1,-4],
      [3, 0],[-3, 0],[ 0,3],[ 0,-3],
      [3, 1],[-3, 1],[ 1,3],[ 1,-3],
      [3, 2],[-3, 2],[ 2,3],[ 2,-3],
      [3,-1],[-3,-1],[-1,3],[-1,-3],
      [3,-2],[-3,-2],[-2,3],[-2,-3],
    ];
    let i = 0;
    let j = 0;
    xyOffsets.forEach((value) => {
      i = this.tileX + value[0];
      j = this.tileY + value[1];
      this.attackGrid.push([i,j]);
    });
  }

};