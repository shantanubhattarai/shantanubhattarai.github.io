class Tank extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.walkableLevel = 1;
    this.damage = 10;
    this.counterDefense = 50;
    this.isVehicle = 1;
    this.vehicleAttackModifier = 100;
    this.defense = 40;
    this.range = 4;
    this.type='Tank';
    this.spritePos = {
      red: {x: 3, y: 313},
      blue: {x: 392, y: 313},
      green: {x: 3, y: 881},
      yellow: {x: 392, y: 881},
      redInactive: {x: 339,y: 313},
      blueInactive: {x: 728,y: 313},
      greenInactive: {x: 339,y: 881},
      yellowInactive: {x: 728, y: 881}
    }
  }
};