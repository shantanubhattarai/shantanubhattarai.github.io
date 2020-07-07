class Infantry extends Unit{
  constructor(tileX, tileY, range, walkableLevel, color){
    super(tileX, tileY, range, walkableLevel, color);
    this.actionCount = 2;
  }
};