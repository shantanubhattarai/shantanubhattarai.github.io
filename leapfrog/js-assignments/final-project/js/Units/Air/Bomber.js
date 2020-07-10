class Bomber extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.walkableLevel = 5;
    this.range = 4;
    this.attackType = 'normal';
    this.type='Bomber';
    this.damageMatrix = {
      'Infantry' : 100,
      'Mech': 100,
      'Recon': 100,
      'APC': 105,
      'Anti Air': 90,
      'Tank': 100,
      'MD Tank': 90,
      'Artillery': 100,
      'Rocket Launcher': 100,
      'Missile Launcher': 100,
      'Cruiser': 90,
      'Battleship': 80
    };
    this.spritePos = {
      red: {
        idle: {
          0: {x: 3, y: 484},
          1: {x: 20, y: 484},
          2: {x: 37, y: 484},
          3: {x: 20, y: 484}
        },
        move:{
          0: {x: 3, y: 484},
          1: {x: 20, y: 484},
          2: {x: 37, y: 484},
          3: {x: 20, y: 484}
        }
      },
      // red: {x: 3, y: 484},
      blue: {
        idle: {
          0: {x: 392, y: 484},
          1: {x:409,y: 484},
          2: {x: 426, y: 484},
          3: {x:409,y: 484}
        },
        move:{
          0: {x: 392, y: 484},
          1: {x:409,y: 484},
          2: {x: 426, y: 484},
          3: {x:409,y: 484}
        }
      },
      green: {
        idle: {
          0: {x: 3, y: 1052},
          1: {x: 20, y: 1052},
          2: {x: 37, y: 1052},
          3: {x: 20, y: 1052}
        },
        move:{
          0: {x: 3, y: 1052},
          1: {x: 20, y: 1052},
          2: {x: 37, y: 1052},
          3: {x: 20, y: 1052}
        }
      },
      // red: {x: 3, y: 1052},
      yellow: {
        idle: {
          0: {x: 392, y: 1052},
          1: {x:409,y: 1052},
          2: {x: 426, y: 1052},
          3: {x:409,y: 1052}
        },
        move:{
          0: {x: 392, y: 1052},
          1: {x:409,y: 1052},
          2: {x: 426, y: 1052},
          3: {x:409,y: 1052}
        }
      },
      redInactive: {x: 339,y: 484},
      blueInactive: {x: 728,y: 484},
      greenInactive: {x: 339,y: 1052},
      yellowInactive: {x: 728, y: 1052}
    }
  }
};