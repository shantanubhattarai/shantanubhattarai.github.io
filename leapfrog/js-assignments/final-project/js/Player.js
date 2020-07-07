class Player{
  constructor(color){
    this.unitList = [];
    this.active = true;
    this.color = color;
  }
  addUnit(tileX, tileY, range, walkableLevel){
    let newUnit = new Infantry(tileX, tileY, range, walkableLevel, this.color);
    this.unitList.push(newUnit);
  }
}