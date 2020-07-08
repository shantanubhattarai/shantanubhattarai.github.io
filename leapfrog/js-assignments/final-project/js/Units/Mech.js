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
    this.spritePos = {
      red: {x: 3, y: 199},
      blue: {x: 392, y: 199},
      green: {x: 3, y: 672},
      yellow: {x: 392, y: 672},
      redInactive: {x: 339,y: 199},
      blueInactive: {x: 728,y: 199},
      greenInactive: {x: 339,y: 672},
      yellowInactive: {x: 728, y: 672}
    }
  }
};