class Infantry extends Unit{
  constructor(tileX, tileY, range, walkableLevel, color){
    super(tileX, tileY, range, walkableLevel, color);
    this.actionCount = 2;
    this.walkableLevel = 3;
    this.damage = 10;
    this.counterModifier = 50;
    this.defense = 20;
    this.spritePos = {
      red: {x: 3, y: 104},
      blue: {x: 392, y: 104},
      green: {x: 3, y: 672},
      yellow: {x: 392, y: 672},
      redInactive: {x: 339,y: 104},
      blueInactive: {x: 728,y: 104},
      greenInactive: {x: 339,y: 672},
      yellowInactive: {x: 728, y: 672}
    }
  }
};