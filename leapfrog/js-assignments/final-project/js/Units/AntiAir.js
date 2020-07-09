class AntiAir extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.walkableLevel = 1;
    this.range = 4;
    this.type='Anti Air';
    this.damageMatrix = {
      'Infantry' : 100,
      'Mech': 100,
      'Recon': 60,
      'APC': 50,
      'Anti Air': 50,
      'Tank': 30,
      'MD Tank': 10,
      'Artillery': 50,
      'Rocket Launcher': 60,
      'Missile Launcher': 60,
      'Transport Copter': 100,
      'Helicopter': 100,
      'Fighter': 100,
      'Bomber': 100
    };
    this.spritePos = {
      red: {
        idle: {
          0: {x: 3, y: 389},
          1: {x: 20, y: 389},
          2: {x: 37, y: 389},
          3: {x: 20, y: 389}
        },
        move:{
          0: {x: 214, y: 265},
          1: {x: 239, y: 265},
          2: {x: 264, y: 265},
          3: {x: 239, y: 265}
        }
      },
      blue: {
        idle: {
          0: {x: 392, y: 389},
          1: {x:409,y: 389},
          2: {x: 426, y: 389},
          3: {x:409,y: 389}
        },
        move:{
          0: {x: 603, y: 265},
          1: {x: 628, y: 265},
          2: {x: 653, y: 265},
          3: {x: 628, y: 265}
        }
      },
      green: {
        idle: {
          0: {x: 3, y: 957},
          1: {x: 20, y: 957},
          2: {x: 37, y: 957},
          3: {x: 20, y: 957}
        },
        move:{
          0: {x: 214, y: 833},
          1: {x: 239, y: 833},
          2: {x: 264, y: 833},
          3: {x: 239, y: 833}
        }
      },
      yellow: {
        idle: {
          0: {x: 392, y: 957},
          1: {x:409,y: 957},
          2: {x: 426, y: 957},
          3: {x:409,y: 957}
        },
        move:{
          0: {x: 603, y: 833},
          1: {x: 628, y: 833},
          2: {x: 653, y: 833},
          3: {x: 628, y: 833}
        }
      },
      redInactive: {x: 339,y: 389},
      blueInactive: {x: 728,y: 389},
      greenInactive: {x: 339,y: 957},
      yellowInactive: {x: 728, y: 957}
    }
  }
};