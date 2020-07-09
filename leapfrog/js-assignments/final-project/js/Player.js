class Player{
  constructor(color){
    this.unitList = [];
    this.active = true;
    this.color = color;
  }

  addUnit(tileX, tileY, unitType){
    let newUnit;
    switch (unitType){
      case 'Infantry': {
        newUnit = new Infantry(tileX, tileY, this.color);
        break;
      }
      case 'Mech': {
        newUnit = new Mech(tileX, tileY, this.color);
        break;
      }
      case 'Recon': {
        newUnit = new Recon(tileX, tileY, this.color);
        break;
      }
      case 'Artillery': {
        newUnit = new Artillery(tileX, tileY, this.color);
        break;
      }
      case 'Cruiser': {
        newUnit = new Cruiser(tileX, tileY, this.color);
        break;
      }
      case 'Tank': {
        newUnit = new Tank(tileX, tileY, this.color);
        break;
      }
      case 'MD Tank': {
        newUnit = new MDTank(tileX, tileY, this.color);
        break;
      }
      case 'Helicopter': {
        newUnit = new Helicopter(tileX, tileY, this.color);
        break;
      }
    }
    this.unitList.push(newUnit);
    return newUnit;
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