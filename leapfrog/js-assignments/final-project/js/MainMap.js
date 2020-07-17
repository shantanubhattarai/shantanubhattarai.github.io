/** Defines the main map for the game */
const mainMap = {
  cols: 32,
  rows: 28,
  tsize: 26,
  sourceSize: 17,
  gap: 1,
  layers: defaultLayers,
  /** Gets tile at given position and layer
   * @param layer layer to find tile on
   * @param col column to find tile on
   * @param row row to find tile on
   */
  getTile: function(layer, col,row){
    return this.layers[layer][row * this.cols + col];
  },
  /**
   * Sets tile at given position
   * @param layer layer to set new tile on
   * @param col column to set new tile on
   * @param row row to set new tile on
   * @param newTile tile to set at given col,row
   */
  setTile: function(layer, col, row, newTile){
    this.layers[layer][row * this.cols + col] = newTile;
  },
  /** Get how walkable a tile is
   * increasing value denotes lower walkability
   * @param tileX x position of tile
   * @param tileY y postion of tile
   */
  getTileWalkable(tileX, tileY){
    // let normalWalk = []; fill these with tiles representing each, then just array includes below
    let slowWalk = [2,3];
    // let oneWalk = [];
    let water = [111,112,113,155,156,157,137,120, 122,141, 134, 135];
    // let air = [];
    return this.layers.reduce((res, layer, index) => {
      var tile = this.getTile(index, tileX, tileY);
      var walkableLevel = 1;
      if(slowWalk.includes(tile)){
        walkableLevel = 2; //air, infantry and mech, one tile less movement, no water
      }else if(tile == 5 || tile == 7){
        walkableLevel = 3; //air, infantry and mech, one movement max, no water
      }else if(tile == 28 || tile == 29){
        walkableLevel = 5; //air only
      }else if(water.includes(tile)){
        walkableLevel = 4; //water and air only
      }
      return walkableLevel;
    });
  },
  /** Gets how much range one tile counts as
   * @param tileX x position of tile
   * @param tileY y position of tile
   */
  getTileMoveCost(tileX, tileY){
    //for setting to 1, return 9 and check for 9 then reduce count to 1.
    return this.layers.reduce(() => {
      if(this.getTileWalkable(tileX, tileY) == 2){
        return 2;
      }else{
        return 1;
      }
    });
  },
  /**Get if tile has players from opposing teams
   * @param tileX x position of tile
   * @param tileY y position of tile
   */
  getTileHasOpposingPlayer(tileX, tileY){
    let hasCollided = false;
    playerList.forEach(valueP => {
      if(valueP.active == false){
        valueP.unitList.forEach(valueU => {
          if((tileX) == valueU.tileX && (tileY) == valueU.tileY){
            hasCollided = true;
          }
        });
      }
    });
    return hasCollided;
  },
  /** Gets if tile is buidling
   * @param tileX x position of tile
   * @param tileY y position of tile
   */
  getTileIsBuilding(tileX, tileY){
    let isBuilding = false;
    let buildingTiles = [500, 501, 490, 534, 491, 535, 622, 578, 623, 579];
    if(buildingTiles.includes(this.getTile(1, tileX, tileY))){
      isBuilding = true;
    }
    return isBuilding;
  },
  /** Gets if tile is factory
   * @param tileX x position of tile
   * @param tileY y position of tile
   */
  getTileIsFactory(tileX, tileY){
    let isFactory = false;
    let factoryTiles = [501, 491, 535, 623, 579];
    if(factoryTiles.includes(this.getTile(1, tileX, tileY))){
      isFactory = true;
    }
    return isFactory;
  },
  /** Gets if tile has unit
   * @param tileX x position of tile
   * @param tileY y position of tile
   */
  getTileHasUnit(tileX, tileY){
    let hasCollided = false;
    playerList.forEach(valueP => {
        valueP.unitList.forEach(valueU => {
          if((tileX) == valueU.tileX && (tileY) == valueU.tileY){
            hasCollided = true;
          }
        });
    });
    return hasCollided;
  },
  /** Gets which unit the tile has
   * @param tileX x position of tile
   * @param tileY y position of tile
   */
  getUnitOnTile(tileX, tileY){
    let unitOnTile = undefined;
    playerList.forEach(valueP => {
        valueP.unitList.forEach(valueU => {
          if((tileX) == valueU.tileX && (tileY) == valueU.tileY){
            unitOnTile = valueU;
          }
        });
    });
    return unitOnTile;
  },
  /** get if tile has units of current active player
   * @param tileX xposition of tile
   * @param tileY yposition of tile
   */
  getTileHasPlayerUnit(tileX, tileY){
    let playerUnit = undefined;
    currentPlayer.unitList.forEach(valueU => {
      if((tileX) == valueU.tileX && (tileY) == valueU.tileY){
        playerUnit = valueU;
      }
    });
    return playerUnit;
  }
}