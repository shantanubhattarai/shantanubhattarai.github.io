/** Defines a player
 * @param color what color the player is - red, blue, greeen, yellow
 */
class Player{
  constructor(color){
    this.unitList = [];
    this.active = true;
    this.color = color;
    this.actions = 5;
    this.actionCounter = 0;
    this.capturedBuildings = [];
    this.capturedFactories = [];
    this.activeFactories = [];
    this.funds = 1000;
  }

  /** adds unit under player
   * @param tileX x position of tile to add unit to
   * @param tileY y position of tile to add unit to
   * @param unitType which unit type to add
   */
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

  /** gets list of factories that are active - captured and not blocked by other units */
  getActiveFactories(){
    this.activeFactories = this.capturedFactories.filter((factory) => {
      return !mainMap.getTileHasUnit(factory.tileX, factory.tileY);
    });
  }

  /** Updates list of active factories, if player has units left, calculates actions */
  update(){
    this.getActiveFactories();
    if(this.unitList.length + this.activeFactories.length < 5) this.actions = this.unitList.length + this.activeFactories.length;
    else this.actions = 5;
    this.unitList.forEach((valueU) => {
      if(valueU.hp <= 0) {
        let indexToRemove = this.unitList.indexOf(valueU);
        this.unitList.splice(indexToRemove, 1);
      };
    });
    if(this.unitList.length > 0 && this.actionCounter >= this.actions){
      window.mainGameLoop.switchToken();
    }
    if(this.unitList.length <= 0){
      if(!window.mainGameLoop.lostPlayers.includes(this.color)) window.mainGameLoop.lostPlayers.push(this.color);
    }
  }

  /** Increase actions done this turn */
  increaseCounter(){
    selectedUnit = undefined;
    this.actionCounter++;
  }

  /** Set actions done this turn
   * @param count set number of actions to this
   */
  setCounter(count){
    this.actionCounter = 0;
  }

  /** get if this player's unit is on given tile
   * @param tileX x position of tile
   * @param tileY y position of tile
  */
  isUnitOnTile(tileX, tileY){
    var unitOnTile = false;
    this.unitList.forEach((valueU) => {
      if(valueU !== selectedUnit && valueU.tileX == tileX && valueU.tileY == tileY){
        unitOnTile = true;
      }
    });
    return unitOnTile;
  }

  /** Increase this player's funds
   * @param amount amount to increase funds by
   */
  increaseMoney(amount){
    this.funds += amount;
  }

    /** Set this player's funds
   * @param amount amount to set funds to
   */
  setMoney(amount){
    this.funds = amount;
  }

  /** Increase hp of units */
  increaseUnitHP(){
    this.unitList.forEach((value) => {
      value.checkOnCapturedBuilding();
    });
  }

}