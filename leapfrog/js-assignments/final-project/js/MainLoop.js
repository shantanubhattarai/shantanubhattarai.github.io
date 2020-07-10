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
    this.token = 0;
    this.setToken(0);
    this.gameState = {
      current: 0,
      start: 0,
      running: 1,
      gameOver: 2
    }
    this.showStartMenu();
    //use mousemove for hover
    this.canvas.addEventListener('click', (e) => {
      if(this.gameState.current == this.gameState.start){
        this.gameState.current = this.gameState.runnning;
        this.init();
      }
      else
      {
        let rect = self.canvas.getBoundingClientRect();
        let mousePos = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        }

        let clickedTile = {
          tileX: Math.floor(mousePos.x / mainMap.tsize) + 1,
          tileY: Math.floor(mousePos.y / mainMap.tsize) + 1
        };
        let clickedUnit = mainMap.getUnitOnTile(clickedTile.tileX, clickedTile.tileY);
        if(clickedUnit !== undefined){
          showInfoUnit = clickedUnit;
        }

        if((selectedUnit == undefined || selectedUnit.actionState == selectedUnit.actionState.inactive || selectedUnit.actionState == selectedUnit.actionState.idle)
        && mainMap.getTileIsBuilding(clickedTile.tileX-1, clickedTile.tileY-1) && !mainMap.getTileHasUnit(clickedTile.tileX, clickedTile.tileY)){
          buildingsList.forEach((building) => {
            if((building.capturedBy == this.token && building.tileX == clickedTile.tileX && building.tileY == clickedTile.tileY)){
              selectedFactory = building;
              uiManager.unitMenu.style.display = 'block';
            }
          });
        }else{
          selectedFactory = undefined;
          uiManager.unitMenu.style.display = 'none';
        }

        if(selectedUnit !== undefined && selectedUnit.actionState.current == selectedUnit.actionState.prepareMove){
          selectedUnit.moveTo(clickedTile.tileX, clickedTile.tileY);
        }else if(selectedUnit !== undefined && selectedUnit.actionState.current == selectedUnit.actionState.prepareFire){
          let isUnitClicked = this.checkIfClickedOnEnemy(clickedTile);
          if(!isUnitClicked){
            selectedUnit.drawAttackGrid = false;
            selectedUnit.attackGrid = [];
            selectedUnit.actionState.current = selectedUnit.actionState.selectingAction;
            selectedUnit.actionState.currentState = 'idle';
          }
        }else if(selectedUnit == undefined || selectedUnit.actionState.current == selectedUnit.actionState.idle){
          this.selectClickedUnit(clickedTile);
        }else if(selectedUnit !== undefined && selectedUnit.actionState.current == selectedUnit.actionState.prepareLoad){
            if(selectedUnit.isArrayinArray(selectedUnit.loadGrid, [clickedTile.tileX, clickedTile.tileY])){
              let clickedUnit = mainMap.getTileHasPlayerUnit(clickedTile.tileX, clickedTile.tileY)
              if(clickedUnit !== undefined && clickedUnit !== selectedUnit && clickedUnit.type == "Infantry" || clickedUnit.type == "Mech"){
              selectedUnit.loadUnit(clickedUnit);
            }
          }else{
            selectedUnit.loadGrid = [];
            selectedUnit.actionState.current = selectedUnit.actionState.selectingAction;
          }
        }else if(selectedUnit !== undefined && selectedUnit.actionState.current == selectedUnit.actionState.prepareDrop){
          if(selectedUnit.isArrayinArray(selectedUnit.dropGrid, [clickedTile.tileX, clickedTile.tileY])){
            selectedUnit.dropUnit(clickedTile);
          }else{
          selectedUnit.dropGrid = [];
          selectedUnit.actionState.current = selectedUnit.actionState.selectingAction;
        }
      }
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
            valueU.actionState.currentState = 'idle';
          }else{
            valueU.startMovement();
            selectedUnit = valueU;
            selectedUnit.actionState.current = selectedUnit.actionState.prepareMove;
            selectedUnit.actionState.currentState = 'idle';
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
              selectedUnit.actionState.currentState = 'inactive';
              isUnitClicked = true;
              currentPlayer.increaseCounter();
              //window.mainGameLoop.switchToken();
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
          valueU.actionState.currentState = 'idle';
        });
      }
    });
  }

  switchToken(){
    currentPlayer.setCounter(0);
    if(selectedUnit !== undefined) selectedUnit.movementGrid = [];
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
          valueU.actionState.currentState = 'idle';
          valueU.movementPath = [];
          valueU.movementGrid = [];
          if(valueU.loadedUnit !== undefined && valueU.loadedUnit !== ''){
            valueU.loadedUnit.currentState = valueU.loadedUnit.inactive;
          }
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
            (tile > 22) ? ((tile % 22 - 1) * mainMap.sourceSize)+1 : (tile - 1) * mainMap.sourceSize + 1,
            (tile > 22) ? (Math.floor(tile/22) * mainMap.sourceSize)+1 : 1,
            mainMap.sourceSize-1,
            mainMap.sourceSize-1,
            c * (mainMap.tsize),
            r * (mainMap.tsize),
            mainMap.tsize,
            mainMap.tsize
          );
        }
      }
    }
  }

  updatePlayers(){
    playerList.forEach((valueP)=>{
      valueP.unitList.forEach((valueU) => {
        valueU.update();
      });
    });
  }

  update(){
    if(currentPlayer !== undefined){
      this.updatePlayers();
      uiManager.update();
      if(currentPlayer.unitList.length <= 0){
        this.switchToken();
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

  showStartMenu(){
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
    this.context.fillStyle = "#13ace1";
    this.context.rect(0,0, this.canvas.width, this.canvas.height);
    this.context.fill();
    this.context.closePath();
    this.context.fillStyle = '#000000';
    this.context.font = "48px AW2";
    this.context.fillText("Left Click to Start", 270, 356);
    this.context.beginPath();
    this.context.rect(260, 370, 260, 20);
    this.context.fill();
    this.context.closePath();
  }

  init(){
    this.render();
    this.generateBuildings();
  }

  drawUnits(){
    playerList.forEach(player => {
      player.update();
      player.unitList.forEach(unit => unit.draw(this.context));
    });
  }

  incrementFrames(){
    if(frames < 200) frames++;
    else frames = 0;
    if(frames % 8 == 0) {
      animationFrame++;
      if(animationFrame > 3) animationFrame = 0;
    };
  }

  drawBuildings(){
    buildingsList.forEach((building) => {building.draw(this.context);} );
  }

  render(){
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.drawLayer(0);
    this.drawLayer(1);
    this.drawUnits();
    this.drawBuildings();
    this.update();
    this.incrementFrames();
    window.requestAnimationFrame(this.render.bind(this));
  }
}

let player1 = new Player('red');
playerList.push(player1);
player1.addUnit(10,8,'Rocket Launcher');
player1.addUnit(11,10,'Bomber');
player1.addUnit(12,10,'Fighter');
player1.addUnit(10,9,'Infantry');
player1.addUnit(12,12,'APC');


let player2 = new Player('blue');
playerList.push(player2);
player2.addUnit(10,11,'Rocket Launcher');
// player2.addUnit(8,13,'Bomber');
// player2.addUnit(8,14,'MD Tank');

let player3 = new Player('green');
playerList.push(player3);
player3.addUnit(6, 8, 'Rocket Launcher');
player3.addUnit(6, 9, 'Bomber');
player3.addUnit(14, 14, 'Cruiser');

let player4 = new Player('yellow');
playerList.push(player4);
player4.addUnit(5, 9, 'Rocket Launcher');
player4.addUnit(4, 9, 'Bomber');
player4.addUnit(8, 9, 'Recon');

let uiManager = new UIManager();
var mainGameLoop = new MainGameLoop();