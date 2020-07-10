class Fighter extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.walkableLevel = 5;
    this.attackType = 'normal';
    this.range = 4;
    this.type='Fighter';
    this.damageMatrix = {
      'Transport Copter': 100,
      'Helicopter': 100,
      'Fighter': 60,
      'Bomber': 100
    };
    this.spritePos = {
      red: {
        idle: {
          0: {x: 3, y: 465},
          1: {x: 20, y: 465},
          2: {x: 37, y: 465},
          3: {x: 20, y: 465}
        },
        move:{
          0: {x: 3, y: 465},
          1: {x: 20, y: 465},
          2: {x: 37, y: 465},
          3: {x: 20, y: 465}
        }
      },
      // red: {x: 3, y: 465},
      blue: {
        idle: {
          0: {x: 392, y: 465},
          1: {x:409,y: 465},
          2: {x: 426, y: 465},
          3: {x:409,y: 465}
        },
        move:{
          0: {x: 392, y: 465},
          1: {x:409,y: 465},
          2: {x: 426, y: 465},
          3: {x:409,y: 465}
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
      redInactive: {x: 339,y: 465},
      blueInactive: {x: 728,y: 465},
      greenInactive: {x: 339,y: 1071},
      yellowInactive: {x: 728, y: 1071}
    }
  }
};