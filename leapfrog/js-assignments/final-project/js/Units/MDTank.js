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
      red: {x: 3, y: 332},
      blue: {x: 392, y: 332},
      green: {x: 3, y: 881},
      yellow: {x: 392, y: 881},
      redInactive: {x: 339,y: 332},
      blueInactive: {x: 728,y: 332},
      greenInactive: {x: 339,y: 881},
      yellowInactive: {x: 728, y: 881}
    }
  }
};