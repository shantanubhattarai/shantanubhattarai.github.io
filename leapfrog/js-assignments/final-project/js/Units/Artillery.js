class Artillery extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 1;
    this.walkableLevel = 1;
    this.damage = 10;
    this.counterDefense = 50;
    this.isVehicle = 1;
    this.vehicleAttackModifier = 100;
    this.defense = 10;
    this.range = 3;
    this.type='Artillery';
    this.spritePos = {
      red: {
        idle: {
          0: {x: 3, y: 408},
          1: {x: 20, y: 408},
          2: {x: 37, y: 408},
          3: {x: 20, y: 408}
        },
        move:{
          0: {x: 214, y: 343},
          1: {x: 239, y: 342},
          2: {x: 264, y: 343},
          3: {x: 239, y: 342}
        }
      },
      blue: {
        idle: {
          0: {x: 392, y: 408},
          1: {x:409,y: 408},
          2: {x: 426, y: 408},
          3: {x:409,y: 408}
        },
        move:{
          0: {x: 603, y: 343},
          1: {x: 628, y: 342},
          2: {x: 653, y: 343},
          3: {x: 628, y: 342}
        }
      },
      green: {
        idle: {
          0: {x: 3, y: 976},
          1: {x: 20, y: 976},
          2: {x: 37, y: 976},
          3: {x: 20, y: 976}
        },
        move:{
          0: {x: 214, y: 911},
          1: {x: 239, y: 910},
          2: {x: 264, y: 911},
          3: {x: 239, y: 910}
        }
      },
      yellow: {
        idle: {
          0: {x: 392, y: 976},
          1: {x:409,y: 976},
          2: {x: 426, y: 976},
          3: {x:409,y: 976}
        },
        move:{
          0: {x: 603, y: 911},
          1: {x: 628, y: 910},
          2: {x: 653, y: 911},
          3: {x: 628, y: 910}
        }
      },
      redInactive: {x: 339,y: 408},
      blueInactive: {x: 728,y: 408},
      greenInactive: {x: 339,y: 976},
      yellowInactive: {x: 728, y: 976}
    }
  }

  generateAttackTiles(){
    // add more offsets for different ranges
    this.attackGrid = [];
    let xyOffsets = [[1,1],[-1,-1],[-1,1],[1,-1],[-1,-2],[-1,2],[1,-2],[1,2],[-2, 0], [2,0], [0, -2], [0,2],[-2,1],[2,1],[-2,-1],[2,-1],[-3, 0], [3,0], [0, -3], [0,3]];
    let i = 0;
    let j = 0;
    xyOffsets.forEach((value) => {
      i = this.tileX + value[0];
      j = this.tileY + value[1];
      this.attackGrid.push([i,j]);
    });
  }

};