class Mech extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.walkableLevel = 3;
    this.damage = 6;
    this.counterDefense = 50;
    this.defense = 20;
    this.vehicleAttackModifier = 130;
    this.isVehicle = 0;
    this.type='Mech';
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