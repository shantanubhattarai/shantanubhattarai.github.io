class Recon extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.walkableLevel = 1;
    this.attackType = 'normal';
    this.range = 6;
    this.type='Recon';
    this.damageMatrix = {
      'Infantry' : 70,
      'Mech': 70,
      'Recon': 40,
      'APC': 50,
      'Anti Air': 1,
      'Tank': 1,
      'MD Tank': 1,
      'Artillery': 50,
      'Rocket Launcher': 60,
      'Missile Launcher': 30,
      'Transport Copter': 40,
      'Helicopter': 10
    };


    this.spritePos = {
      red: {
        idle: {
          0: {x: 3, y: 294},
          1: {x: 20, y: 294},
          2: {x: 37, y: 294},
          3: {x: 20, y: 294}
        },
        move:{
          0: {x: 59, y: 497},
          1: {x: 85, y: 497},
          2: {x: 110, y: 497},
          3: {x: 85, y: 497}
        }
      },
      blue: {
        idle: {
          0: {x: 392, y: 294},
          1: {x:409,y: 294},
          2: {x: 426, y: 294},
          3: {x:409,y: 294}
        },
        move:{
          0: {x: 451, y: 497},
          1: {x: 475, y: 497},
          2: {x: 499, y: 497},
          3: {x: 475, y: 497}
        }
      },
      green: {
        idle: {
          0: {x: 3, y: 862},
          1: {x: 20, y: 862},
          2: {x: 37, y: 862},
          3: {x: 20, y: 862}
        },
        move:{
          0: {x: 59, y: 1065},
          1: {x: 85, y: 1065},
          2: {x: 110, y: 1065},
          3: {x: 85, y: 1065}
        }
      },
      yellow: {
        idle: {
          0: {x: 392, y: 862},
          1: {x:409,y: 862},
          2: {x: 426, y: 862},
          3: {x:409,y: 862}
        },
        move:{
          0: {x: 451, y: 1065},
          1: {x: 475, y: 1065},
          2: {x: 499, y: 1065},
          3: {x: 475, y: 1065}
        }
      },
      redInactive: {x: 339,y: 294},
      blueInactive: {x: 728,y: 294},
      greenInactive: {x: 339,y: 862},
      yellowInactive: {x: 728, y: 862}
    }
  }
};