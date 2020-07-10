class RocketLauncher extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 1;
    this.walkableLevel = 1;
    this.range = 3;
    this.type='Rocket Launcher';
    this.attackType = 'long';
    this.damageMatrix = {
      'Infantry' : 100,
      'Mech': 90,
      'Recon': 90,
      'APC': 80,
      'Anti Air': 90,
      'Tank': 80,
      'MD Tank': 60,
      'Artillery': 80,
      'Rocket Launcher': 90,
      'Missile Launcher': 90,
      'Cruiser': 90,
      'Battleship': 60
    };
    this.spritePos = {
      red: {
        idle: {
          0: {x: 3, y: 427},
          1: {x: 20, y: 427},
          2: {x: 37, y: 427},
          3: {x: 20, y: 427}
        },
        move:{
          0: {x: 3, y: 427},
          1: {x: 20, y: 427},
          2: {x: 37, y: 427},
          3: {x: 20, y: 427}
        }
      },
      blue: {
        idle: {
          0: {x: 392, y: 427},
          1: {x:409,y: 427},
          2: {x: 426, y: 427},
          3: {x:409,y: 427}
        },
        move:{
          0: {x: 392, y: 427},
          1: {x:409,y: 427},
          2: {x: 426, y: 427},
          3: {x:409,y: 427}
        }
      },
      green: {
        idle: {
          0: {x: 3, y: 995},
          1: {x: 20, y: 995},
          2: {x: 37, y: 995},
          3: {x: 20, y: 995}
        },
        move:{
          0: {x: 3, y: 995},
          1: {x: 20, y: 995},
          2: {x: 37, y: 995},
          3: {x: 20, y: 995}
        }
      },
      yellow: {
        idle: {
          0: {x: 392, y: 995},
          1: {x:409,y: 995},
          2: {x: 426, y: 995},
          3: {x:409,y: 995}
        },
        move:{
          0: {x: 392, y: 995},
          1: {x:409,y: 995},
          2: {x: 426, y: 995},
          3: {x:409,y: 995}
        }
      },
      redInactive: {x: 339,y: 427},
      blueInactive: {x: 728,y: 427},
      greenInactive: {x: 339,y: 995},
      yellowInactive: {x: 728, y: 995}
    }
  }

  generateAttackTiles(){
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