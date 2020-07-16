/** Defines the main map for the game */
const mainMap = {
  cols: 32,
  rows: 28,
  tsize: 26,
  sourceSize: 17,
  gap: 1,
  layers: [
    [
    1,1,1 ,1,4,1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,4,1,1,1,1,1,4,1,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,
    1,1,4 ,1,1,1,1,1,1,1,1,4,1,1,1,4,1,1,1,4,1,1,1,4,1,1,1,1,4,1,1,1,
    1,4,1 ,1,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,4,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,4,1,4,1,1,1,1,1,1,1,4,1,1,1,1,1,1,4,1,1,4,1,1,1,
    1,4,1 ,1,1,1,1,4,1,1,1,4,1,1,1,1,1,1,4,1,1,1,1,1,4,1,1,1,1,1,1,1,
    1,6,27,1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,4,1,
    1,1,1 ,4,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,4,1,1,1,1,1,1,4,1,4,1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,4,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,4,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,4 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,6,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1 ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ],
    [
    134 ,157 ,2   ,2   ,0   ,0   ,0   ,2   ,7   ,7   ,7   ,5   ,2   ,0   ,2   ,2   ,5   ,7   ,7   ,2   ,2   ,2   ,0   ,2   ,5   ,7   ,7   ,7   ,2   ,2   ,155 ,134,
    157 ,2   ,2   ,2   ,500 ,500 ,0   ,2   ,29  ,29  ,28  ,2   ,0   ,0   ,0   ,0   ,2   ,29  ,28  ,2   ,0   ,0   ,0   ,0   ,2   ,29  ,28  ,28  ,2   ,2   ,2   ,155,
    2   ,2   ,0   ,0   ,0   ,0   ,0   ,7   ,29  ,28  ,2   ,0   ,500 ,501 ,500 ,0   ,2   ,29  ,2   ,0   ,501 ,81  ,501 ,0   ,2   ,28  ,2   ,2   ,0   ,2   ,2   ,2   ,
    2   ,0   ,0   ,111 ,112 ,113 ,0   ,28  ,28  ,2   ,0   ,0   ,0   ,0   ,0   ,0   ,2   ,28  ,2   ,0   ,0   ,77  ,0   ,0   ,2   ,2   ,0   ,0   ,0   ,0   ,2   ,2   ,
    0   ,0   ,111 ,122 ,156 ,157 ,0   ,2   ,0   ,2   ,0   ,0   ,111 ,112 ,113 ,0   ,0   ,2   ,0   ,0   ,501 ,81  ,501 ,2   ,2   ,0   ,500 ,500 ,0   ,0   ,2   ,2   ,
    2   ,0   ,155 ,157 ,0   ,0   ,2   ,0   ,0   ,2   ,2   ,0   ,155 ,134 ,120 ,113 ,0   ,2   ,0   ,0   ,0   ,77  ,2   ,2   ,0   ,0   ,0   ,0   ,0   ,2   ,2   ,2   ,
    7   ,0   ,0   ,0   ,0   ,2   ,501 ,81  ,501 ,0   ,2   ,0   ,0   ,155 ,156 ,157 ,0   ,2   ,0   ,0   ,0   ,77  ,0   ,0   ,0   ,0   ,0   ,0   ,2   ,2   ,0   ,2   ,
    29  ,28  ,28  ,0   ,2   ,0   ,0   ,77  ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,500 ,0   ,77  ,0   ,111 ,112 ,113 ,0   ,0   ,0   ,0   ,0   ,0   ,
    28  ,2   ,2   ,0   ,0   ,0   ,501 ,81  ,501 ,2   ,0   ,500 ,0   ,2   ,2   ,0   ,0   ,0   ,0   ,0   ,2   ,81  ,0   ,155 ,156 ,120 ,112 ,113 ,0   ,0   ,500 ,0   ,
    2   ,0   ,0   ,0   ,2   ,0   ,0   ,77  ,0   ,2   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,10  ,76  ,76  ,56  ,0   ,0   ,0   ,155 ,156 ,157 ,0   ,500 ,0   ,2   ,
    2   ,500 ,500 ,0   ,2   ,0   ,0   ,77  ,2   ,0   ,0   ,0   ,0   ,111 ,112 ,112 ,112 ,112 ,79  ,113 ,0   ,0   ,2   ,0   ,0   ,0   ,0   ,0   ,0   ,2   ,2   ,7   ,
    2   ,0   ,0   ,0   ,0   ,0   ,0   ,77  ,0   ,0   ,0   ,0   ,111 ,141 ,134 ,134 ,156 ,156 ,79  ,120 ,113 ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,2   ,2   ,7   ,29  ,
    2   ,2   ,0   ,0   ,111 ,113 ,0   ,77  ,111 ,113 ,0   ,111 ,134 ,134 ,134 ,135 ,2   ,0   ,0   ,155 ,120 ,113 ,0   ,0   ,0   ,0   ,0   ,2   ,2   ,5   ,28  ,29  ,
    7   ,2   ,2   ,2   ,155 ,120 ,112 ,79  ,141 ,157 ,500 ,155 ,134 ,134 ,134 ,135 ,500 ,501 ,500 ,0   ,133 ,135 ,0   ,0   ,0   ,2   ,2   ,0   ,2   ,2   ,2   ,28  ,
    29  ,7   ,7   ,2   ,0   ,155 ,156 ,79  ,157 ,0   ,0   ,2   ,155 ,134 ,134 ,137 ,113 ,0   ,2   ,111 ,141 ,135 ,0   ,0   ,2   ,500 ,0   ,0   ,0   ,0   ,2   ,2   ,
    29  ,29  ,28  ,5   ,13  ,76  ,76  ,56  ,0   ,2   ,2   ,0   ,2   ,155 ,156 ,156 ,156 ,112 ,79  ,141 ,134 ,157 ,2   ,0   ,500 ,111 ,112 ,112 ,112 ,113 ,0   ,2   ,
    28  ,28  ,2   ,2   ,81  ,0   ,0   ,0   ,2   ,2   ,2   ,0   ,0   ,0   ,0   ,0   ,0   ,155 ,79  ,156 ,157 ,2   ,2   ,0   ,0   ,155 ,156 ,156 ,156 ,120 ,112 ,112 ,
    2   ,2   ,0   ,0   ,77  ,500 ,500 ,500 ,2   ,0   ,2   ,500 ,0   ,0   ,2   ,2   ,0   ,10  ,58  ,76  ,76  ,76  ,76  ,76  ,76  ,12  ,0   ,0   ,0   ,155 ,134 ,134 ,
    2   ,0   ,111 ,112 ,79  ,113 ,0   ,0   ,0   ,2   ,2   ,0   ,500 ,500 ,0   ,0   ,0   ,77  ,2   ,2   ,2   ,2   ,0   ,0   ,501 ,81  ,501 ,0   ,0   ,0   ,155 ,156 ,
    2   ,0   ,155 ,156 ,79  ,120 ,112 ,113 ,0   ,2   ,0   ,2   ,2   ,0   ,2   ,0   ,2   ,77  ,0   ,0   ,2   ,2   ,2   ,0   ,0   ,77  ,0   ,0   ,2   ,2   ,0   ,2   ,
    7   ,0   ,2   ,0   ,77  ,155 ,156 ,157 ,0   ,0   ,2   ,2   ,2   ,2   ,2   ,0   ,0   ,77  ,111 ,113 ,0   ,2   ,2   ,0   ,501 ,81  ,501 ,2   ,0   ,2   ,2   ,7   ,
    29  ,28  ,2   ,2   ,57  ,76  ,76  ,11  ,76  ,76  ,76  ,76  ,76  ,76  ,76  ,76  ,76  ,56  ,133 ,135 ,0   ,0   ,2   ,0   ,2   ,2   ,0   ,0   ,0   ,0   ,5   ,29  ,
    28  ,2   ,0   ,2   ,2   ,0   ,501 ,81  ,501 ,0   ,0   ,2   ,0   ,111 ,113 ,0   ,0   ,111 ,141 ,135 ,0   ,0   ,2   ,0   ,0   ,0   ,111 ,112 ,113 ,0   ,2   ,29  ,
    2   ,0   ,0   ,0   ,0   ,0   ,0   ,77  ,0   ,0   ,2   ,2   ,0   ,133 ,120 ,112 ,112 ,141 ,156 ,157 ,0   ,2   ,0   ,111 ,112 ,112 ,141 ,134 ,135 ,0   ,2   ,28  ,
    2   ,2   ,500 ,0   ,2   ,2   ,501 ,81  ,501 ,2   ,7   ,5   ,0   ,155 ,156 ,156 ,156 ,157 ,0   ,0   ,0   ,0   ,500 ,155 ,156 ,156 ,156 ,156 ,157 ,0   ,2   ,2   ,
    2   ,2   ,0   ,500 ,0   ,2   ,2   ,2   ,7   ,7   ,28  ,2   ,0   ,0   ,0   ,0   ,0   ,0   ,27  ,2   ,0   ,500 ,0   ,2   ,0   ,2   ,0   ,0   ,0   ,2   ,2   ,2   ,
    113 ,2   ,2   ,0   ,2   ,2   ,7   ,2   ,29  ,29  ,29  ,0   ,500 ,500 ,501 ,2   ,2   ,2   ,29  ,27  ,2   ,0   ,0   ,0   ,2   ,2   ,2   ,2   ,2   ,2   ,2   ,111 ,
    120 ,113 ,0   ,2   ,5   ,5   ,28  ,5   ,28  ,28  ,28  ,2   ,2   ,2   ,2   ,2   ,2   ,5   ,28  ,28  ,5   ,2   ,2   ,2   ,2   ,5   ,5   ,5   ,2   ,2   ,111 ,141
    ]
  ],
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