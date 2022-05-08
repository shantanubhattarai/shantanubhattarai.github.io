class Tank extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.walkableLevel = 1;
    this.range = 4;
    this.type='Tank';
    this.damageMatrix = {
      'Infantry' : 80,
      'Mech': 70,
      'Recon': 90,
      'APC': 80,
      'Anti Air': 70,
      'Tank': 60,
      'MD Tank': 20,
      'Artillery': 70,
      'Rocket Launcher': 80,
      'Missile Launcher': 80,
      'Transport Copter': 40,
      'Helicopter': 10,
      'Cruiser': 10,
      'Battleship': 10
    };
    this.spritePos = {
      red: {
        idle: {
          0: {x: 3, y: 313},
          1: {x: 20, y: 313},
          2: {x: 37, y: 313},
          3: {x: 20, y: 313}
        },
        move:{
          0: {x: 137, y: 497},
          1: {x: 162, y: 496},
          2: {x: 187, y: 497},
          3: {x: 162, y: 496}
        }
      },
      blue: {
        idle: {
          0: {x: 392, y: 313},
          1: {x:409,y: 313},
          2: {x: 426, y: 313},
          3: {x:409,y: 313}
        },
        move:{
          0: {x: 525, y: 497},
          1: {x: 550, y: 496},
          2: {x: 575, y: 497},
          3: {x: 550, y: 496}
        }
      },
      green: {
        idle: {
          0: {x: 3, y: 881},
          1: {x: 20, y: 881},
          2: {x: 37, y: 881},
          3: {x: 20, y: 881}
        },
        move:{
          0: {x: 137, y: 1065},
          1: {x: 162, y: 1065},
          2: {x: 187, y: 1065},
          3: {x: 162, y: 1065}
        }
      },
      yellow: {
        idle: {
          0: {x: 392, y: 881},
          1: {x:409,y: 881},
          2: {x: 426, y: 881},
          3: {x:409,y: 881}
        },
        move:{
          0: {x: 525, y: 1065},
          1: {x: 550, y: 1065},
          2: {x: 575, y: 1065},
          3: {x: 550, y: 1065}
        }
      },
      redInactive: {x: 339,y: 313},
      blueInactive: {x: 728,y: 313},
      greenInactive: {x: 339,y: 881},
      yellowInactive: {x: 728, y: 881}
    }
  }
};