class Recon extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.walkableLevel = 1;
    this.damage = 10;
    this.counterDefense = 50;
    this.isVehicle = 0;
    this.vehicleAttackModifier = 100;
    this.defense = 10;
    this.range = 5;
    this.spritePos = {
      red: {x: 3, y: 294},
      blue: {x: 392, y: 294},
      green: {x: 3, y: 881},
      yellow: {x: 392, y: 881},
      redInactive: {x: 339,y: 294},
      blueInactive: {x: 728,y: 294},
      greenInactive: {x: 339,y: 881},
      yellowInactive: {x: 728, y: 881}
    }
  }
};