class Fighter extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.walkableLevel = 5;

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