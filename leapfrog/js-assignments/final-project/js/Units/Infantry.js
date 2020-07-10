class Infantry extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.walkableLevel = 3;
    this.range = 3;
    this.vehicleAttackModifier = 20;
    this.attackType = 'normal';
    this.type = 'Infantry';
    this.damageMatrix = {
      'Infantry' : 60,
      'Mech': 50,
      'Recon': 10,
      'APC': 20,
      'Anti Air': 10,
      'Tank': 10,
      'MD Tank': 1,
      'Artillery': 20,
      'Rocket Launcher': 30,
      'Missile Launcher': 30,
      'Transport Copter': 30,
      'Helicopter': 10
    };
    this.spritePos = {
      red: {
        idle: {
          0: {x: 3, y: 104},
          1: {x: 20, y: 104},
          2: {x: 37, y: 104},
          3: {x: 20, y: 104}
        },
        move:{
          0: {x: 62, y: 112},
          1: {x: 86, y: 111},
          2: {x: 112, y: 112},
          3: {x: 86, y: 111}
        },
        capture:{
          0: {x: 1, y: 1},
          1: {x: 18, y: 1},
          2: {x: 35, y: 1},
          3: {x: 18, y: 1}
        }
      },
      blue: {
        idle: {
          0: {x: 392, y: 104},
          1: {x:409,y: 104},
          2: {x: 426, y: 104},
          3: {x:409,y: 104}
        },
        move:{
          0: {x: 451, y: 112},
          1: {x: 475, y: 111},
          2: {x: 499, y: 112},
          3: {x: 475, y: 111}
        },
        capture:{
          0: {x: 1, y: 28},
          1: {x: 18, y: 28},
          2: {x: 35, y: 28},
          3: {x: 18, y: 28}
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
          0: {x: 62, y: 680},
          1: {x: 86, y: 679},
          2: {x: 112, y: 680},
          3: {x: 86, y: 679}
        },
        capture:{
          0: {x: 1, y: 82},
          1: {x: 18, y: 82},
          2: {x: 35, y: 82},
          3: {x: 18, y: 82}
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
          0: {x: 451, y: 680},
          1: {x: 475, y: 679},
          2: {x: 499, y: 680},
          3: {x: 475, y: 679}
        },
        capture:{
          0: {x: 1, y: 55},
          1: {x: 18, y: 55},
          2: {x: 35, y: 55},
          3: {x: 18, y: 55}
        }
      },
      redInactive: {x: 339,y: 104},
      blueInactive: {x: 728,y: 104},
      greenInactive: {x: 339,y: 672},
      yellowInactive: {x: 728, y: 672}
    }
  }
};