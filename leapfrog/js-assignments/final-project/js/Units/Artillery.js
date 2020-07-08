class Artillery extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 1;
    this.walkableLevel = 1;
    this.damage = 10;
    this.counterDefense = 50;
    this.isVehicle = 1;
    this.vehicleAttackModifier = 100;
    this.defense = 40;
    this.range = 4;
    this.spritePos = {
      red: {x: 3, y: 408},
      blue: {x: 392, y: 408},
      green: {x: 3, y: 881},
      yellow: {x: 392, y: 881},
      redInactive: {x: 339,y: 408},
      blueInactive: {x: 728,y: 408},
      greenInactive: {x: 339,y: 881},
      yellowInactive: {x: 728, y: 881}
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