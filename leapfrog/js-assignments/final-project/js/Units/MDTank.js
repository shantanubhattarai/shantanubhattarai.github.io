class MDTank extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.walkableLevel = 1;
    this.damage = 15;
    this.counterDefense = 80;
    this.isVehicle = 1;
    this.vehicleAttackModifier = 110;
    this.defense = 60;
    this.range = 4;
    this.type='MD Tank';
    this.spritePos = {
      red: {
        idle: {
          0: {x: 3, y: 332},
          1: {x: 20, y: 332},
          2: {x: 37, y: 332},
          3: {x: 20, y: 332}
        },
        move:{
          0: {x: 62, y: 573},
          1: {x: 86, y: 573},
          2: {x: 111, y: 573},
          3: {x: 86, y: 573}
        }
      },
      blue: {
        idle: {
          0: {x: 392, y: 332},
          1: {x:409,y: 332},
          2: {x: 426, y: 332},
          3: {x:409,y: 332}
        },
        move:{
          0: {x: 450, y: 573},
          1: {x: 475, y: 573},
          2: {x: 500, y: 573},
          3: {x: 475, y: 573}
        }
      },
      green: {
        idle: {
          0: {x: 3, y: 900},
          1: {x: 20, y: 900},
          2: {x: 37, y: 900},
          3: {x: 20, y: 900}
        },
        move:{
          0: {x: 62, y: 1141},
          1: {x: 86, y: 1141},
          2: {x: 111, y: 1141},
          3: {x: 86, y: 1141}
        }
      },
      yellow: {
        idle: {
          0: {x: 392, y: 900},
          1: {x:409,y: 900},
          2: {x: 426, y: 900},
          3: {x:409,y: 900}
        },
        move:{
          0: {x: 450, y: 1141},
          1: {x: 475, y: 1141},
          2: {x: 500, y: 1141},
          3: {x: 475, y: 1141}
        }
      },
      redInactive: {x: 339,y: 332},
      blueInactive: {x: 728,y: 332},
      greenInactive: {x: 339,y: 900},
      yellowInactive: {x: 728, y: 900}
    }
  }
};