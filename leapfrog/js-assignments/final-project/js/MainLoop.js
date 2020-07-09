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

      if((selectedUnit == undefined || selectedUnit.actionState == actionState.inactive || selectedUnit.actionState == actionState.idle)
      && mainMap.getTileIsBuilding(clickedTile.tileX-1, clickedTile.tileY-1) && !mainMap.getTileHasPlayer(clickedTile.tileX, clickedTile.tileY)){
        buildingsList.forEach((building) => {
          if((building.capturedBy == this.token && building.tileX == clickedTile.tileX && building.tileY == clickedTile.tileY)){
            selectedFactory = building;
            unitMenu.style.display = 'inline-block';
          }
        });
      }else{
        selectedFactory = undefined;
        unitMenu.style.display = 'none';
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

  showCaptureIfBuilding(){
    if(
      mainMap.getTileIsBuilding(selectedUnit.tileX-1, selectedUnit.tileY-1)
      && (selectedUnit.type == 'Infantry' || selectedUnit.type == 'Mech')
    ){
      actionMenuCapture.style.display = 'block';
      buildingsList.forEach((building) => {
        if((building.capturedBy == this.token && building.tileX == selectedUnit.tileX && building.tileY == selectedUnit.tileY)){
          actionMenuCapture.style.display = 'none';
        }
      });
    }else{
      actionMenuCapture.style.display = 'none';
    }
  }

  showMove(){
    if(selectedUnit !== undefined && selectedUnit.movementPath.length == 0){
      actionMenuMove.style.display = 'block';
    }else{
      actionMenuMove.style.display = 'none';
    }
  }

  hideAttack(){
    if(selectedUnit.actionCount == 1 && selectedUnit.movementPath.length > 0){
      actionMenuAttack.style.display=  'none';
    }else{
      actionMenuAttack.style.display=  'block';
    }
  }

  updatePlayers(){
    playerList.forEach((valueP)=>{
      valueP.unitList.forEach((valueU) => {
        valueU.update();
      });
    });
  }

  showMenu(){
    if(selectedUnit !== undefined && selectedUnit.actionState.current == selectedUnit.actionState.selectingAction){
      this.showCaptureIfBuilding();
      this.showMove();
      this.hideAttack();
      actionMenu.style.display = 'inline-block';
    }else{
      actionMenu.style.display = 'none';
    }
  }

  update(){
    if(currentPlayer !== undefined){
      this.updatePlayers();
      this.showMenu();
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

  render(){
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.drawLayer(0);
    this.drawLayer(1);
    this.drawUnits();
    this.update();
    this.incrementFrames();
    window.requestAnimationFrame(this.render.bind(this));
  }
}

let player1 = new Player('red');
playerList.push(player1);
player1.addUnit(10,6,'Infantry');

let player2 = new Player('blue');
playerList.push(player2);
player2.addUnit(10,23,'Infantry');

let player3 = new Player('green');
playerList.push(player3);
player3.addUnit(20, 6, 'Infantry');

let player4 = new Player('yellow');
playerList.push(player4);
player4.addUnit(21, 24, 'Infantry');

var mainGameLoop = new MainGameLoop();