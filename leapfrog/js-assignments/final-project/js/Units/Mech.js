class Mech extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.range = 2;
    this.walkableLevel = 3;
    this.type='Mech';
    this.damageMatrix = {
      'Infantry' : 70,
      'Mech': 60,
      'Recon': 90,
      'APC': 80,
      'Anti Air': 70,
      'Tank': 50,
      'MD Tank': 20,
      'Artillery': 70,
      'Rocket Launcher': 90,
      'Missile Launcher': 90,
      'Transport Copter': 40,
      'Helicopter': 10
    };
    this.spritePos = {
      red: {
        idle: {
          0: {x: 3, y: 199},
          1: {x: 20, y: 199},
          2: {x: 37, y: 199},
          3: {x: 20, y: 199}
        },
        move:{
          0: {x: 139, y: 112},
          1: {x: 163, y: 111},
          2: {x: 188, y: 112},
          3: {x: 163, y: 111}
        }
      },
      // red: {x: 3, y: 199},
      blue: {
        idle: {
          0: {x: 392, y: 199},
          1: {x:409,y: 199},
          2: {x: 426, y: 199},
          3: {x:409,y: 199}
        },
        move:{
          0: {x: 528, y: 112},
          1: {x: 553, y: 111},
          2: {x: 578, y: 112},
          3: {x: 553, y: 111}
        }
      },
      green: {
        idle: {
          0: {x: 3, y: 767},
          1: {x: 20, y: 767},
          2: {x: 37, y: 767},
          3: {x: 20, y: 767}
        },
        move:{
          0: {x: 139, y: 680},
          1: {x: 163, y: 679},
          2: {x: 188, y: 680},
          3: {x: 163, y: 679}
        }
      },
      yellow: {
        idle: {
          0: {x: 392, y: 767},
          1: {x:409,y: 767},
          2: {x: 426, y: 767},
          3: {x:409,y: 767}
        },
        move:{
          0: {x: 528, y: 680},
          1: {x: 553, y: 679},
          2: {x: 578, y: 680},
          3: {x: 553, y: 679}
        }
      },
      redInactive: {x: 339,y: 199},
      blueInactive: {x: 728,y: 199},
      greenInactive: {x: 339,y: 767},
      yellowInactive: {x: 728, y: 767}
    }
  }
};