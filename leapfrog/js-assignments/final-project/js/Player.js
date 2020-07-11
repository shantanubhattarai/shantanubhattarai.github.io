class Player{
  constructor(color){
    this.unitList = [];
    this.active = true;
    this.color = color;
    this.actions = 5;
    this.actionCounter = 0;
    this.capturedFactories = [];
    this.activeFactories = [];
    this.funds = 1000;
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
      case 'Anti Air': {
        newUnit = new AntiAir(tileX, tileY, this.color);
        break;
      }
      case 'Missile Launcher': {
        newUnit = new MissileLauncher(tileX, tileY, this.color);
        break;
      }
      case 'APC': {
        newUnit = new APC(tileX, tileY, this.color);
        break;
      }
      case 'Rocket Launcher': {
        newUnit = new RocketLauncher(tileX, tileY, this.color);
        break;
      }
      case 'Transport Copter': {
        newUnit = new TransportCopter(tileX, tileY, this.color);
        break;
      }
      case 'Fighter': {
        newUnit = new Fighter(tileX, tileY, this.color);
        break;
      }
      case 'Bomber': {
        newUnit = new Bomber(tileX, tileY, this.color);
        break;
      }
      case 'Battleship': {
        newUnit = new Battleship(tileX, tileY, this.color);
        break;
      }
    }
    this.unitList.push(newUnit);
    return newUnit;
  }

  getActiveFactories(){
    this.activeFactories = this.capturedFactories.filter((factory) => {
      return !mainMap.getTileHasUnit(factory.tileX, factory.tileY);
    });
  }

  update(){
    this.getActiveFactories();
    if(this.unitList.length + this.activeFactories.length < 5) this.actions = this.unitList.length + this.activeFactories.length;
    this.unitList.forEach((valueU) => {
      if(valueU.hp <= 0) {
        let indexToRemove = this.unitList.indexOf(valueU);
        this.unitList.splice(indexToRemove, 1);
      };
    });
    if(this.unitList.length > 0 && this.actionCounter >= this.actions){
      window.mainGameLoop.switchToken();
    }
  }

  increaseCounter(){
    selectedUnit = undefined;
    this.actionCounter++;
  }

  setCounter(count){
    this.actionCounter = 0;
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

  increaseMoney(amount){
    this.funds += amount;
  }

  setMoney(amount){
    this.funds = amount;
  }

}