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
  }

  getCaptured(player){
    this.capturedBy = window.mainGameLoop.token;
    this.color = player.color;
    this.setNewTile();
    this.captureProgress = 0;
    currentPlayer.capturedFactories.push(this);
  }

  spawnUnit(unitType){
    let newUnit = currentPlayer.addUnit(this.tileX, this.tileY, unitType);
    newUnit.actionState.current = actionState.inactive;
    newUnit.actionState.currentState = 'inactive';
    unitMenu.style.display = 'none';
    currentPlayer.increaseCounter();
    //window.mainGameLoop.switchToken();
  }
}