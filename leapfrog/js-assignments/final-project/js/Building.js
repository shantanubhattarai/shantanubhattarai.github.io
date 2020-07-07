class Building{
  constructor(tileX, tileY){
    this.tileX = tileX;
    this.tileY = tileY;
    this.captureProgress = 0;
    this.capturedBy = -1;
    this.color = 'neutral';
    this.colorTiles = {
      'neutral' : 500,
      'red': 490,
      'blue': 512,
      'green': 490,
      'orange': 490
    }
  }

  getCaptured(player){
    this.capturedBy = playerList.indexOf(player);
    this.color = player.color;
    this.setNewTile();
  }

  setNewTile = () => {
    mainMap.setTile(1, this.tileX-1, this.tileY-1, this.colorTiles[this.color]);
  }

}