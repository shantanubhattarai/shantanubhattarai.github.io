class Infantry extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.walkableLevel = 3;
    this.damage = 6;
    this.counterDefense = 50;
    this.defense = 20;
    this.vehicleAttackModifier = 20;
    this.isVehicle = 0;
    this.type='Infantry';
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
        }
      },
      redInactive: {x: 339,y: 104},
      blueInactive: {x: 728,y: 104},
      greenInactive: {x: 339,y: 672},
      yellowInactive: {x: 728, y: 672}
    }
  }
};