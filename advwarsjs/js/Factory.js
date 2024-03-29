class Factory extends Building{
  constructor(tileX, tileY){
    super(tileX, tileY);
    this.color = 'neutral';
    this.type = 'factory';
    this.colorTiles = {
      'neutral' : 501,
      'red': 491,
      'blue': 535,
      'green': 623,
      'yellow': 579
    };
    this.pricesList = {
      'Infantry': 1000,
      'Mech': 3000,
      'Recon': 4000,
      'APC': 5000,
      'Anti Air': 8000,
      'Tank': 7000,
      'MD Tank': 16000,
      'Artillery': 6000,
      'Rocket Launcher': 15000,
      'Missile Launcher': 12000,
      'Cruiser': 18000,
      'Battleship': 28000,
      'Transport Copter': 5000,
      'Helicopter': 9000,
      'Fighter': 20000,
      'Bomber': 22000
    }
  }

  /** Gets price of any unit
   * @param unitType unit to get price of, string
   */
  getPrice = (unitType) =>{
    return this.pricesList[unitType];
  }

  /** Get caputred by selected player
   * @param player player to get captured by
   */
  getCaptured(player){
    soundManager.playCaptureComplete();
    this.capturedBy = window.mainGameLoop.token;
    this.color = player.color;
    this.setNewTile();
    this.captureProgress = 0;
    currentPlayer.capturedFactories.push(this);
    currentPlayer.capturedBuildings.push(this);
  }

  /** Spawns a unit
   * @param unitType uni ttype to spawn, string
   * @param unitMenu menu to disable after spawning
   */
  spawnUnit(unitType, unitMenu){
    let newUnit = currentPlayer.addUnit(this.tileX, this.tileY, unitType);
    newUnit.actionState.current = newUnit.actionState.inactive;
    newUnit.actionState.currentState = 'inactive';
    unitMenu.style.display = 'none';
    currentPlayer.increaseCounter();
    //window.mainGameLoop.switchToken();
  }
}