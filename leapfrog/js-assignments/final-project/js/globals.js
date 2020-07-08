const mainMap = {
  cols: 32,
  rows: 28,
  tsize: 17,
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
    134 ,157 ,2   ,2   ,0   ,0   ,0   ,2  ,7   ,7   ,7   ,5   ,2   ,0   ,2   ,2   ,5   ,7   ,7   ,2   ,2   ,2   ,0   ,2   ,5   ,7   ,7   ,7   ,2,2   ,155 ,134,
    157 ,2   ,2   ,2   ,500 ,500 ,0   ,2  ,29  ,29  ,28  ,2   ,0   ,0   ,0   ,0   ,2   ,29  ,28  ,2   ,0   ,0   ,0   ,0   ,2   ,29  ,28  ,28  ,2,2   ,2   ,155,
    2   ,2   ,0   ,0   ,0   ,0   ,0   ,7  ,29  ,28  ,2   ,0   ,500 ,501 ,500 ,0   ,2   ,29  ,2   ,0   ,501 ,81  ,501 ,0   ,2   ,28  ,2   ,2   ,0,2   ,2   ,2   ,
    2   ,0   ,0   ,111 ,112 ,113 ,0   ,28 ,28  ,2   ,0   ,0   ,0   ,0   ,0   ,0   ,2   ,28  ,2   ,0   ,0   ,77  ,0   ,0   ,2   ,2   ,0   ,0   ,0,0   ,2   ,2   ,
    0   ,0   ,111 ,122 ,156 ,157 ,0   ,2  ,0   ,2   ,0   ,0   ,111 ,112 ,113 ,0   ,0   ,2   ,0   ,0   ,501 ,81  ,501 ,2   ,2   ,0   ,500 ,500 ,0,0   ,2   ,2   ,
    2   ,0   ,155 ,157 ,0   ,0   ,2   ,0  ,0   ,2   ,2   ,0   ,155 ,134 ,120 ,113 ,0   ,2   ,0   ,0   ,0   ,77  ,2   ,2   ,0   ,0   ,0   ,0   ,0,2   ,2   ,2   ,
    7   ,0   ,0   ,0   ,0   ,2   ,501 ,81 ,501 ,0   ,2   ,0   ,0   ,155 ,156 ,157 ,0   ,2   ,0   ,0   ,0   ,77  ,0   ,0   ,0   ,0   ,0   ,0   ,2,2   ,0   ,2   ,
    29  ,28  ,28  ,0   ,2   ,0   ,0   ,77 ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,500 ,0   ,77  ,0   ,111 ,112 ,113 ,0   ,0   ,0,0   ,0   ,0   ,
    28  ,2   ,2   ,0   ,0   ,0   ,501 ,81 ,501 ,2   ,0   ,500 ,0   ,2   ,2   ,0   ,0   ,0   ,0   ,0   ,2   ,81  ,0   ,155 ,156 ,120 ,112 ,113 ,0,0   ,500 ,0   ,
    2   ,0   ,0   ,0   ,2   ,0   ,0   ,77 ,0   ,2   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,10  ,76  ,76  ,56  ,0   ,0   ,0   ,155 ,156 ,157 ,0,500 ,0   ,2   ,
    2   ,500 ,500 ,0   ,2   ,0   ,0   ,77 ,2   ,0   ,0   ,0   ,0   ,111 ,112 ,112 ,112 ,112 ,79  ,113 ,0   ,0   ,2   ,0   ,0   ,0   ,0   ,0   ,0,2   ,2   ,7   ,
    2   ,0   ,0   ,0   ,0   ,0   ,0   ,77 ,0   ,0   ,0   ,0   ,111 ,141 ,134 ,134 ,156 ,156 ,79  ,120 ,113 ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,2,2   ,7   ,29  ,
    2   ,2   ,0   ,0   ,111 ,113 ,0   ,77 ,111 ,113 ,0   ,111 ,134 ,134 ,134 ,135 ,2   ,0   ,0   ,155 ,120 ,113 ,0   ,0   ,0   ,0   ,0   ,2   ,2,5   ,28  ,29  ,
    7   ,2   ,2   ,2   ,155 ,120 ,112 ,79 ,141 ,157 ,500 ,155 ,134 ,134 ,134 ,135 ,500 ,501 ,500 ,0   ,133 ,135 ,0   ,0   ,0   ,2   ,2   ,0   ,2,2   ,2   ,28  ,
    29  ,7   ,7   ,2   ,0   ,155 ,156 ,79 ,157 ,0   ,0   ,2   ,155 ,134 ,134 ,137 ,113 ,0   ,2   ,111 ,141 ,135 ,0   ,0   ,2   ,500 ,0   ,0   ,0,0   ,2   ,2   ,
    29  ,29  ,28  ,5   ,0   ,0   ,0   ,0  ,0   ,2   ,2   ,0   ,2   ,155 ,156 ,156 ,156 ,112 ,79  ,141 ,134 ,157 ,2   ,0   ,500 ,0   ,0   ,0   ,0,0   ,0   ,2   ,
    28  ,28  ,2   ,2   ,0   ,0   ,0   ,0  ,2   ,2   ,2   ,0   ,0   ,0   ,0   ,0   ,0   ,155 ,79  ,156 ,157 ,2   ,2   ,0   ,0   ,0   ,0   ,0   ,0,0   ,0   ,0   ,
    2   ,2   ,0   ,0   ,0   ,0   ,0   ,0  ,2   ,0   ,2   ,500 ,0   ,0   ,2   ,2   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0,0   ,0   ,0   ,
    2   ,0   ,0   ,0   ,0   ,0   ,0   ,0  ,0   ,2   ,2   ,0   ,500 ,500 ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0,0   ,0   ,0   ,
    2   ,0   ,0   ,0   ,0   ,0   ,0   ,0  ,0   ,2   ,0   ,2   ,2   ,0   ,2   ,0   ,2   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0,0   ,0   ,0   ,
    7   ,0   ,2   ,0   ,0   ,0   ,0   ,0  ,0   ,0   ,2   ,2   ,2   ,2   ,2   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0,0   ,0   ,0   ,
    29  ,28  ,2   ,2   ,0   ,0   ,0   ,0  ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0,0   ,0   ,0   ,
    28  ,2   ,0   ,2   ,2   ,0   ,0   ,0  ,0   ,0   ,0   ,2   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0,0   ,0   ,0   ,
    2   ,0   ,0   ,0   ,0   ,0   ,0   ,0  ,0   ,0   ,2   ,2   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0,0   ,0   ,0   ,
    2   ,2   ,0   ,0   ,2   ,2   ,0   ,0  ,0   ,2   ,7   ,5   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0,0   ,0   ,0   ,
    2   ,2   ,0   ,0   ,0   ,2   ,2   ,2  ,7   ,7   ,28  ,2   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0,0   ,0   ,0   ,
    0   ,2   ,2   ,0   ,2   ,2   ,7   ,2  ,29  ,29  ,29  ,0   ,0   ,0   ,0   ,2   ,2   ,2   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0,0   ,0   ,0   ,
    0   ,0   ,0   ,2   ,5   ,5   ,28  ,5  ,28  ,28  ,28  ,2   ,2   ,2   ,2   ,2   ,2   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0   ,0,0   ,0   ,0
  ]
],
  getTile: function(layer, col,row){
    return this.layers[layer][row * this.cols + col];
  },
  setTile: function(layer, col, row, newTile){
    this.layers[layer][row * this.cols + col] = newTile;
  },
  getTileWalkable(tileX, tileY){
    // let normalWalk = []; fill these with tiles representing each, then just array includes below
    // let slowWalk = [];
    // let oneWalk = [];
    // let water = [];
    // let air = [];
    return this.layers.reduce((res, layer, index) => {
      var tile = this.getTile(index, tileX, tileY);
        var walkableLevel = 1;
        if(tile == 2 || tile == 3){
          walkableLevel = 2; //air, infantry and mech, one tile less movement, no water
        }else if(tile == 5 || tile == 7){
          walkableLevel = 3; //air, infantry and mech, one movement max, no water
        }else if(tile == 28 || tile == 29){
          walkableLevel = 5; //air only
        }else if(tile == 155 || tile == 134 || tile == 137 || tile == 157){
          walkableLevel = 4; //water and air only
        }
        return walkableLevel;
    });
  },
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
  getTileIsBuilding(tileX, tileY){
    let isBuilding = false;
    let buildingTiles = [500, 501, 490, 534, 491, 535];
    if(buildingTiles.includes(this.getTile(1, tileX, tileY))){
      isBuilding = true;
    }
    return isBuilding;
  },

}

const mainSpriteSheet = document.createElement('img');
mainSpriteSheet.src='./img/UnitMap.png';

const mainHUDSheet = document.createElement('img');
mainHUDSheet.src='./img/HUD.png';



const hudPos = {
  1: {x: 166, y: 23},
  2: {x: 175, y: 23},
  3: {x: 184, y: 23},
  4: {x: 193, y: 23},
  5: {x: 202, y: 23},
  6: {x: 211, y: 23},
  7: {x: 220, y: 23},
  8: {x: 229, y: 23},
  9: {x: 238, y: 23},
}

const actionState = {
  current: 1,
  idle: 1,
  prepareMove: 2,
  move: 3,
  selectingAction: 4,
  prepareFire: 5,
  fire: 6,
  inactive: 7,
}
let selectedUnit;
let currentPlayer;

const actionMenu = document.createElement('div');
let actionMenuList = document.createElement('ul');
let actionMenuMove = document.createElement('li');
actionMenuMove.innerHTML = 'Move';
actionMenuList.appendChild(actionMenuMove);
let actionMenuCapture = document.createElement('li');
actionMenuCapture.innerHTML = 'Capture';
actionMenuList.appendChild(actionMenuCapture);
let actionMenuAttack = document.createElement('li');
actionMenuAttack.innerHTML = 'Attack';
actionMenuList.appendChild(actionMenuAttack);
let actionMenuWait = document.createElement('li');
actionMenuWait.innerHTML = 'Wait';
actionMenuList.appendChild(actionMenuWait);
let actionMenuCancel = document.createElement('li');
actionMenuCancel.innerHTML = 'Cancel';
actionMenuList.appendChild(actionMenuCancel);

actionMenuCapture.style.display= 'none';

actionMenuMove.onclick = () => {
  selectedUnit.startMovement();
  selectedUnit.actionState.current = selectedUnit.actionState.prepareMove;
}

actionMenuCapture.onclick = () => {
  buildingsList.forEach((building) => {
    if(building.tileX == selectedUnit.tileX && building.tileY == selectedUnit.tileY){
      building.captureProgress += 50;
      if(building.captureProgress == 100){
        building.getCaptured(currentPlayer);
      }
    }
  });
  selectedUnit.actionState.current = selectedUnit.actionState.inactive;
  window.mainGameLoop.switchToken();
}

actionMenuAttack.onclick = () => {
  selectedUnit.actionState.current = selectedUnit.actionState.prepareFire;
  selectedUnit.startAttack();
}

actionMenuWait.onclick = () => {
  selectedUnit.actionState.current = selectedUnit.actionState.inactive;
  window.mainGameLoop.switchToken();
}

actionMenuCancel.onclick = () => {
  selectedUnit.revertMove();
}

actionMenu.appendChild(actionMenuList);
document.body.appendChild(actionMenu);
actionMenu.style.display = 'none';

