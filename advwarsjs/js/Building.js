class Building{
  constructor(tileX, tileY){
    this.tileX = tileX;
    this.tileY = tileY;
    this.captureProgress = 0;
    this.capturedBy = -1;
    this.color = 'green';
    this.type = 'building';
    this.colorTiles = {
      'neutral' : 500,
      'red': 490,
      'blue': 534,
      'green': 622,
      'yellow': 578
    }
  }

  /** Set this building as captured by a player
   * @param player which player captured this building
   */
  getCaptured(player){
    soundManager.playCaptureComplete();
    this.capturedBy = window.mainGameLoop.token;
    this.color = player.color;
    this.setNewTile();
    this.captureProgress = 0;
    currentPlayer.capturedBuildings.push(this);
  }

  /** Sets new tile to represent captured building */
  setNewTile = () => {
    mainMap.setTile(1, this.tileX-1, this.tileY-1, this.colorTiles[this.color]);
  }

  /** Draws this building
   * @param context context to draw in
   */
  draw(context){
    if(this.captureProgress == 50) {
      context.drawImage(mainHUDSheet, 139, 59, 8, 8, this.tileX * mainMap.tsize - 12, this.tileY * mainMap.tsize - 12, 12, 12);
    }
  }

}