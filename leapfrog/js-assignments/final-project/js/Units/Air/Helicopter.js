class Helicopter extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.walkableLevel = 5;
    this.attackType = 'normal';
    this.range = 4;
    this.type='Helicopter';
    this.damageMatrix = {
      'Infantry' : 80,
      'Mech': 80,
      'Recon': 60,
      'APC': 60,
      'Anti Air': 30,
      'Tank': 60,
      'MD Tank': 30,
      'Artillery': 70,
      'Rocket Launcher': 70,
      'Missile Launcher': 70,
      'Transport Copter': 90,
      'Helicopter': 70,
      'Cruiser': 60,
      'Battleship': 30
    };
    this.spritePos = {
      red: {
        idle: {
          0: {x: 3, y: 503},
          1: {x: 20, y: 503},
          2: {x: 37, y: 503},
          3: {x: 20, y: 503}
        },
        move:{
          0: {x: 3, y: 503},
          1: {x: 20, y: 503},
          2: {x: 37, y: 503},
          3: {x: 20, y: 503}
        }
      },
      // red: {x: 3, y: 503},
      blue: {
        idle: {
          0: {x: 392, y: 503},
          1: {x:409,y: 503},
          2: {x: 426, y: 503},
          3: {x:409,y: 503}
        },
        move:{
          0: {x: 392, y: 503},
          1: {x:409,y: 503},
          2: {x: 426, y: 503},
          3: {x:409,y: 503}
        }
      },
      green: {
        idle: {
          0: {x: 3, y: 1071},
          1: {x: 20, y: 1071},
          2: {x: 37, y: 1071},
          3: {x: 20, y: 1071}
        },
        move:{
          0: {x: 3, y: 1071},
          1: {x: 20, y: 1071},
          2: {x: 37, y: 1071},
          3: {x: 20, y: 1071}
        }
      },
      // red: {x: 3, y: 1071},
      yellow: {
        idle: {
          0: {x: 392, y: 1071},
          1: {x:409,y: 1071},
          2: {x: 426, y: 1071},
          3: {x:409,y: 1071}
        },
        move:{
          0: {x: 392, y: 1071},
          1: {x:409,y: 1071},
          2: {x: 426, y: 1071},
          3: {x:409,y: 1071}
        }
      },
      redInactive: {x: 339,y: 503},
      blueInactive: {x: 728,y: 503},
      greenInactive: {x: 339,y: 1071},
      yellowInactive: {x: 728, y: 1071}
    }
  }
};