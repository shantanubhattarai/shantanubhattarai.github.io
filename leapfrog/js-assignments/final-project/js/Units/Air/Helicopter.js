class Helicopter extends Unit{
  constructor(tileX, tileY, color){
    super(tileX, tileY, color);
    this.actionCount = 2;
    this.walkableLevel = 5;
    this.damage = 12;
    this.counterDefense = 50;
    this.isVehicle = 1;
    this.vehicleAttackModifier = 100;
    this.defense = 10;
    this.range = 5;
    this.spritePos = {
      red: {x: 3, y: 503},
      blue: {x: 392, y: 503},
      green: {x: 3, y: 881},
      yellow: {x: 392, y: 881},
      redInactive: {x: 339,y: 503},
      blueInactive: {x: 728,y: 503},
      greenInactive: {x: 339,y: 881},
      yellowInactive: {x: 728, y: 881}
    }
  }
};