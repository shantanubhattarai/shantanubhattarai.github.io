class Factory extends Building{
  constructor(tileX, tileY){
    super(tileX, tileY);
    this.color = 'neutral';
    this.type = 'factory';
    this.colorTiles = {
      'neutral' : 501,
      'red': 491,
      'blue': 535,
      'green': 491,
      'orange': 491
    };
  }

  spawnUnit(unitType){
    let newUnit = currentPlayer.addUnit(this.tileX, this.tileY, unitType);
    console.log(newUnit);
    newUnit.actionState.current = actionState.inactive;
    unitMenu.style.display = 'none';
    currentPlayer.increaseCounter();
    //window.mainGameLoop.switchToken();
  }
}