class MainGameLoop{
  constructor(){
    let self = this;
    this.mapTilesImage = document.createElement('img');
    this.mapTilesImage.src = './img/RoadTiles.png';
    this.canvas = document.querySelector('canvas');
    this.canvas.width = mainMap.cols * mainMap.tsize;
    this.canvas.height = mainMap.rows * mainMap.tsize;
    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;
    this.init();
    this.render();
    this.token = 0;
    this.setToken(0);
    //use mousemove for hover
    this.canvas.addEventListener('click', (e) => {
      let rect = self.canvas.getBoundingClientRect();
      let mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }

      let clickedTile = {
        tileX: Math.floor(mousePos.x / mainMap.tsize) + 1,
        tileY: Math.floor(mousePos.y / mainMap.tsize) + 1
      };

      if(mainMap.getTileIsBuilding(clickedTile.tileX-1, clickedTile.tileY-1) && !mainMap.getTileHasPlayer(clickedTile.tileX, clickedTile.tileY)){
        buildingsList.forEach((building) => {
          if(building.capturedBy == this.token && building.tileX == clickedTile.tileX && building.tileY == clickedTile.tileY) {
            selectedFactory = building;
            unitMenu.style.display = 'block';
          }
        });
      }

      if(selectedUnit !== undefined && selectedUnit.actionState.current == selectedUnit.actionState.prepareMove){
        selectedUnit.moveTo(clickedTile.tileX, clickedTile.tileY);
      }else if(selectedUnit !== undefined && selectedUnit.actionState.current == selectedUnit.actionState.prepareFire){
        let isUnitClicked = this.checkIfClickedOnEnemy(clickedTile);

        if(!isUnitClicked){
          selectedUnit.drawAttackGrid = false;
          selectedUnit.attackGrid = [];
          selectedUnit.actionState.current = selectedUnit.actionState.selectingAction;
        }
      }else if(selectedUnit == undefined || selectedUnit.actionState.current == selectedUnit.actionState.idle){
        this.selectClickedUnit(clickedTile);
      }
    });
  }

  selectClickedUnit = (clickedTile) => {
    currentPlayer.unitList.forEach((valueU) => {
      if(valueU.getTilePos().tileX == clickedTile.tileX && valueU.getTilePos().tileY == clickedTile.tileY){
        if(valueU.actionState.current == valueU.actionState.inactive){
          return;
        }
        valueU.generateAttackTiles();
          if(valueU.enemyInAttackTiles()){
            selectedUnit = valueU;
            valueU.actionState.current = selectedUnit.actionState.selectingAction;
          }else{
            valueU.startMovement();
            selectedUnit = valueU;
            selectedUnit.actionState.current = selectedUnit.actionState.prepareMove;
          }
      }
    });
  }

  checkIfClickedOnEnemy = (clickedTile) => {
    let isUnitClicked = false;
    playerList.forEach((valueP) => {
      if(!valueP.active){
        valueP.unitList.forEach((valueU) => {
          if(valueU.getTilePos().tileX == clickedTile.tileX && valueU.getTilePos().tileY == clickedTile.tileY){
            if(attackMatrix[selectedUnit.type].includes(valueU.type)){
              selectedUnit.attack(valueU);
              selectedUnit.actionState.current = selectedUnit.actionState.inactive;
              isUnitClicked = true;
              window.mainGameLoop.switchToken();
            }
          }
        });
      }
    });
    return isUnitClicked;
  }

  setToken = (playerIdx) =>{
    this.token = playerIdx;
    selectedUnit = undefined;
    playerList.forEach((valueP, index) => {
      if(this.token !== undefined && this.token != index){
        valueP.active = false;
      }else{
        valueP.active = true;
        currentPlayer = valueP;
        valueP.unitList.forEach((valueU) => {
          valueU.actionState.current = valueU.actionState.idle;
        });
      }
    });
  }

  switchToken(){
    selectedUnit = undefined;
    if(this.token < playerList.length - 1) this.token++;
    else this.token = 0;
    playerList.forEach((valueP, index) => {
      if(this.token !== undefined && this.token != index){
        valueP.active = false;
      }else{
        valueP.active = true;
        currentPlayer = valueP;
        valueP.unitList.forEach((valueU) => {
          valueU.actionState.current = valueU.actionState.idle;
        });
      }
    });
  }

  drawLayer(layer){
    for(let c = 0; c < mainMap.cols; c++){
      for (let r = 0; r < mainMap.rows; r++){
        var tile = mainMap.getTile(layer, c, r);
        if (tile !== 0){
          this.context.drawImage(
            this.mapTilesImage,
            (tile > 22) ? (tile % 22 - 1) * mainMap.tsize : (tile - 1) * mainMap.tsize,
            (tile > 22) ? Math.floor(tile/22) * mainMap.tsize : 0,
            mainMap.tsize,
            mainMap.tsize,
            c * (mainMap.tsize),
            r * (mainMap.tsize),
            mainMap.tsize,
            mainMap.tsize
          );
        }
      }
    }
  }

  update(){
    if(currentPlayer !== undefined){
      playerList.forEach((valueP)=>{
        valueP.unitList.forEach((valueU) => {
          valueU.update();
        });
      });
      if(selectedUnit !== undefined && selectedUnit.actionState.current == selectedUnit.actionState.selectingAction){
        if(mainMap.getTileIsBuilding(selectedUnit.tileX-1, selectedUnit.tileY-1)){
          actionMenuCapture.style.display = 'block';
          //check if building is already captured by this player
        }else{
          actionMenuCapture.style.display = 'none';
        }
        if(selectedUnit !== undefined && selectedUnit.movementPath.length == 0){
          actionMenuMove.style.display = 'block';
        }else{
          actionMenuMove.style.display = 'none';
        }
        if(selectedUnit.actionCount == 1 && selectedUnit.movementPath.length > 0){
          actionMenuAttack.style.display=  'none';
        }else{
          actionMenuAttack.style.display=  'block';
        }
        actionMenu.style.display = 'block';
      }else{
        actionMenu.style.display = 'none';
      }
    }
  }

  generateBuildings(){
    for(let c = 0; c < mainMap.cols; c++){
      for (let r = 0; r < mainMap.rows; r++){
        var tile = mainMap.getTile(1, c, r);
        if (tile !== 0){
          if(tile == 500){
            let newBuilding = new Building(c+1, r+1);
            buildingsList.push(newBuilding);
          }else if(tile == 501){
            let newBuilding = new Factory(c+1, r+1);
            buildingsList.push(newBuilding);
          }
        }
      }
    }
  }

  init(){
    this.generateBuildings();
  }

  render(){
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.drawLayer(0);
    this.drawLayer(1);
    playerList.forEach(player => {
      player.update();
      player.unitList.forEach(unit => unit.draw(this.context));
    })
    this.update();
    window.requestAnimationFrame(this.render.bind(this));
  }
}

const playerList = [];
const buildingsList = [];
let player1 = new Player('red');
playerList.push(player1);
player1.addUnit(10,6,'Infantry');
player1.addUnit(11,11,'Infantry');
player1.addUnit(5,7,'Tank');
player1.addUnit(6,8,'MD Tank');
player1.addUnit(8,9,'Recon');
player1.addUnit(8,10,'Artillery');
player1.addUnit(13,14,'Cruiser');

let player2 = new Player('blue');
playerList.push(player2);
player2.addUnit(10,23,'Infantry');
player2.addUnit(11,14,'Tank');
player2.addUnit(4,7,'Mech');
player2.addUnit(5,5,'Cruiser');
player2.addUnit(6,6,'Helicopter');

var mainGameLoop = new MainGameLoop();