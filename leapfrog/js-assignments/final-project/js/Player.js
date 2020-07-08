class Player{
  constructor(color){
    this.unitList = [];
    this.active = true;
    this.color = color;
  }

  addUnit(tileX, tileY, unitType){
    let newUnit;
    switch (unitType){
      case 'infantry': {
        newUnit = new Infantry(tileX, tileY, this.color);
        break;
      }
      case 'cruiser': {
        newUnit = new Cruiser(tileX, tileY, this.color);
        break;
      }
    }
    this.unitList.push(newUnit);
  }

  update(){
    this.unitList.forEach((valueU) => {
      if(valueU.hp <= 0) {
        let indexToRemove = this.unitList.indexOf(valueU);
        this.unitList.splice(indexToRemove, 1);
      };
    })
  }

  isUnitOnTile(tileX, tileY){
    var unitOnTile = false;
    this.unitList.forEach((valueU) => {
      if(valueU !== selectedUnit && valueU.tileX == tileX && valueU.tileY == tileY){
        unitOnTile = true;
      }
    });
    return unitOnTile;
  }

}