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
    this.canvas.style.display = 'inline-block';
    this.token = 0;
    this.lostPlayers = [];
    this.setToken(0);
    this.alphaModifier = 1;
    this.xModifier = 0;
    this.playingAttack = false;
    this.playingDamage = false;
    this.gameState = {
      current: 0,
      start: 0,
      running: 1,
      gameOver: 2,
      noclick: 3
    }
    this.showStartMenu();
    //use mousemove for hover
    this.canvas.addEventListener('click', (e) => {
      if(this.gameState.current == this.gameState.noclick){
        return;
      }
      else if(this.gameState.current == this.gameState.start){
        this.gameState.current = this.gameState.running;
        soundManager.startMusic();
        this.init();
      }else if(this.gameState.current == this.gameState.gameOver){
        this.gameState.current = this.gameState.running;
        initializePlayers();
        this.init();
      }
      else if(this.gameState.current == this.gameState.running)
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
        && mainMap.getTileIsFactory(clickedTile.tileX-1, clickedTile.tileY-1) && !mainMap.getTileHasUnit(clickedTile.tileX, clickedTile.tileY)){
          buildingsList.forEach((building) => {
            if((building.capturedBy == this.token && building.tileX == clickedTile.tileX && building.tileY == clickedTile.tileY)){
              selectedFactory = building;
              uiManager.setPrices();
              soundManager.playSelect();
              uiManager.disableUnitMenuItems();
              uiManager.unitMenu.style.display = 'block';
            }
          });
        }else{
          selectedFactory = undefined;
          uiManager.unitMenu.style.display = 'none';
        }

        if(selectedUnit !== undefined && selectedUnit.actionState.current == selectedUnit.actionState.prepareMove){
          soundManager.playSelect();
          selectedUnit.moveTo(clickedTile.tileX, clickedTile.tileY);
        }else if(selectedUnit !== undefined && selectedUnit.actionState.current == selectedUnit.actionState.prepareFire){
          let isUnitClicked = this.checkIfClickedOnEnemy(clickedTile);
          if(!isUnitClicked){
            soundManager.playWrongSelect();
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
              soundManager.playSelect();
            }
          }else{
            selectedUnit.loadGrid = [];
            selectedUnit.actionState.current = selectedUnit.actionState.selectingAction;
          }
        }else if(selectedUnit !== undefined && selectedUnit.actionState.current == selectedUnit.actionState.prepareDrop){
          if(selectedUnit.isArrayinArray(selectedUnit.dropGrid, [clickedTile.tileX, clickedTile.tileY])){
            soundManager.playSelect();
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
        soundManager.playSelect();
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
              soundManager.playSelect();
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
        currentPlayer.setMoney(2000);
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
        let moneyToAdd = currentPlayer.capturedFactories.length * 1000 + 1000;
        currentPlayer.increaseMoney(moneyToAdd);
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
    currentPlayer.increaseUnitHP();
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
    let factoryTiles = [501, 491, 535, 623, 579];
    let buildingTiles = [500, 501, 490, 534, 491, 535, 622, 578, 623, 579];
    for(let c = 0; c < mainMap.cols; c++){
      for (let r = 0; r < mainMap.rows; r++){
        var tile = mainMap.getTile(1, c, r);
        if(factoryTiles.includes(tile)) mainMap.setTile(1, c, r, 501);
        else if (buildingTiles.includes(tile)) mainMap.setTile(1,c,r,500);
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

  showStartMenu = () => {
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
    this.context.fillStyle = "#13ace1";
    this.context.rect(0,0, this.canvas.width, this.canvas.height);
    this.context.fill();
    this.context.closePath();
    this.context.drawImage(logo, 160, 0, 500,300);
    this.context.fillStyle = '#000000';
    this.context.font = "48px AW2";
    this.context.fillText("LEFT CLICK TO START", 260, 356);
    this.context.beginPath();
    this.context.rect(250, 370, 310, 20);
    this.context.fill();
    this.context.closePath();
    if(this.gameState.current == this.gameState.start) window.requestAnimationFrame(this.showStartMenu);
  }

  init(){
    this.lostPlayers = [];
    this.setToken(0);
    this.render();
    this.generateBuildings();
  }

  drawBattleBackground(){
    this.context.beginPath();
    this.context.fillStyle = 'rgba(0,0,0,1)';
    this.context.rect(0,0,this.canvas.width, this.canvas.height);
    this.context.fill();
    this.context.closePath();
  }

  drawBattleOverlay(){
    this.context.beginPath();
    this.context.fillStyle = 'rgba(0,0,0,' + this.alphaModifier + ')';
    this.context.fillRect(0,0,this.canvas.width, this.canvas.height);
    this.context.closePath();
  }

  drawBattleAnimation = () => {
    if(attackingUnit !== undefined && defendingUnit !== undefined){
      this.gameState.current = this.gameState.noclick;
      let attackingBG = {x: 0, y: 0};
      let defendingBG = {x: 0, y: 0};
      if(attackingUnit.walkableLevel == 4){
        attackingBG = {x: 1033, y: 162};
      }else if(attackingUnit.walkableLevel == 5){
        attackingBG = {x: 1033, y: 0};
      }
      if(defendingUnit.walkableLevel == 4){
        defendingBG = {x: 1033, y: 162};
      }else if(defendingUnit.walkableLevel == 5){
        defendingBG = {x: 1033, y: 0};
      }
      this.drawBattleBackground();
      let attackPosModifier = 50;
      let attackingUnitsXPos = 100;
      let counterAttackingUnitsXPos = 600;
      let attackingDirection = 'left';
      let attackerSprite = mainSpriteSheet;
      let defenderSprite = reverseSpriteSheet;
      let attackDirectionModifier = -1;
      let defenseDirectionModifier = 1;
      if(attackingUnit.battlePhase){
        attackingUnitsXPos = 100;
        attackPosModifier = 50;
        attackingDirection = 'right';
        counterAttackingUnitsXPos = 600;
        attackerSprite = reverseSpriteSheet;
        defenderSprite = mainSpriteSheet;
        attackDirectionModifier = -1;
        defenseDirectionModifier = 1;
        this.context.drawImage(battleBG, attackingBG.x, attackingBG.y, 130, 162, 0, 0, this.canvas.width/2 - 5, this.canvas.height);
        this.context.drawImage(battleBG, defendingBG.x, defendingBG.y, 130, 162, this.canvas.width/2, 0, this.canvas.width/2 + 5, this.canvas.height);
      }else if(attackingUnit.counterPhase){
        attackingUnitsXPos = 600;
        attackPosModifier = -120;
        attackingDirection = 'left';
        counterAttackingUnitsXPos = 100;
        attackerSprite = mainSpriteSheet;
        defenderSprite = reverseSpriteSheet;
        attackDirectionModifier = 1;
        defenseDirectionModifier = -1;
        this.context.drawImage(battleBG, attackingBG.x, attackingBG.y, 130, 162, this.canvas.width/2, 0, this.canvas.width/2 - 5, this.canvas.height);
        this.context.drawImage(battleBG, defendingBG.x, defendingBG.y, 130, 162, 0, 0, this.canvas.width/2 + 5, this.canvas.height);
      }
      for(let i = 0; i < attackingUnit.hp / 2; i++){
        this.context.drawImage(attackerSprite, attackingUnit.spritePos[attackingUnit.color]['idle'][animationFrame].x, attackingUnit.spritePos[attackingUnit.color]['idle'][animationFrame].y, 16, 16, this.xModifier + attackingUnitsXPos + attackDirectionModifier * i * 25, 200 + i * 50, 128, 128);
      }
      for(let i = 0; i < defendingUnit.hp / 2; i++){
        this.context.drawImage(defenderSprite, defendingUnit.spritePos[defendingUnit.color]['idle'][animationFrame].x, defendingUnit.spritePos[defendingUnit.color]['idle'][animationFrame].y, 16, 16, counterAttackingUnitsXPos + defenseDirectionModifier * i * 25 - this.xModifier, 200 + i * 50, 128, 128);
      }
      //draw attack animation
      if(attackingUnit.battleCounter > 48 && attackingUnit.battleCounter < 96){
        if(!this.playingAttack) soundManager.playAttack();
        this.playingAttack = true;
        this.context.drawImage(mainHUDSheet, attackingUnit.attackSprites[attackingDirection][attackingUnit.battleAnimFrame].x, attackingUnit.attackSprites[attackingDirection][attackingUnit.battleAnimFrame].y, 48, 48, attackingUnitsXPos + attackPosModifier, 200, 192, 192);
      }
      //draw damage animation
      if(attackingUnit.battleCounter > 136){
        if(!this.playingDamage) soundManager.playDamage();
        this.playingDamage = true;
        this.context.drawImage(mainHUDSheet, defendingUnit.damageSprites[attackingUnit.battleAnimFrame].x, defendingUnit.damageSprites[attackingUnit.battleAnimFrame].y, 32, 32, counterAttackingUnitsXPos, 200, 192, 192);
      }
      if(attackingUnit.battleCounter > 180){
        this.alphaModifier = 1;
        this.xModifier = 0;
        this.playingAttack = false;
        this.playingDamage = false;
      }
      if(attackingUnit.battleCounter > 0 && attackingUnit.battleCounter <= 48){
        this.alphaModifier -= 1/24;
        if(attackingDirection == 'right') this.xModifier += 1;
      }
      this.drawBattleOverlay();
    }else{
      this.gameState.current = this.gameState.running;
    }
  }

  drawCaptureAnimation(){
    if(capturingUnit !== undefined){
      this.gameState.current = this.gameState.noclick;
      if(capturingUnit.captureCounter > 0){
        this.context.drawImage(captBG,280,200,120,200);
        this.context.drawImage(captAnimSheet, capturingUnit.spritePos[capturingUnit.color]['capture'][capturingUnit.captureAnimFrame].x, capturingUnit.spritePos[capturingUnit.color]['capture'][capturingUnit.captureAnimFrame].y, 16,24,290,220,100,130);
      }
    }else{
      this.gameState.current = this.gameState.running;
    }
  }

  drawUnits(){
    playerList.forEach(player => {
      player.update();
      player.unitList.forEach(unit => unit.draw(this.context));
    });
    this.drawCaptureAnimation();
    this.drawBattleAnimation();
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

  showGameOverMenu = () => {
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
    this.context.fillStyle = playerColors[currentPlayer.color];
    this.context.rect(0,0, this.canvas.width, this.canvas.height);
    this.context.fill();
    this.context.closePath();
    this.context.drawImage(logo, 160, 0, 500,300);
    this.context.fillStyle = '#000000';
    this.context.font = "48px AW2";
    this.context.fillText("Congrats Player " + currentPlayer.color.toUpperCase(), 280, 320);
    this.context.fillText("LEFT CLICK TO RESTART", 258, 376);
    this.context.beginPath();
    this.context.rect(240, 390, 365, 20);
    this.context.fill();
    this.context.closePath();
    if(this.gameState.current == this.gameState.gameOver) window.requestAnimationFrame(this.showGameOverMenu);
  }

  checkGameOver = () => {
    if(this.lostPlayers.length >= playerList.length - 1){
      this.gameState.current = this.gameState.gameOver;
      window.uiManager.unitInfo.style.display = 'none';
      window.uiManager.endTurnButton.style.display = 'none';
      this.showGameOverMenu();
    }
  }

  render(){
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.drawLayer(0);
    this.drawLayer(1);
    this.drawUnits();
    this.drawBuildings();
    this.update();
    this.incrementFrames();
    this.checkGameOver();
    if(this.gameState.current == this.gameState.running || this.gameState.current == this.gameState.noclick) window.requestAnimationFrame(this.render.bind(this));
  }
}

function initializePlayers(){
  let player1 = new Player('red');
  let player2 = new Player('blue');
  let player3 = new Player('green');
  let player4 = new Player('yellow');
  playerList = [];
  player1.addUnit(9,9,'Rocket Launcher');
  player1.addUnit(6,9,'Infantry');

  player2.addUnit(6,10,'Infantry');
  player2.addUnit(9,12,'Rocket Launcher');

  playerList.push(player1);
  playerList.push(player2);
  playerList.push(player3);
  playerList.push(player4);
}


// player2.addUnit(10,20,'Infantry');
// player2.addUnit(8,13,'Bomber');
// player2.addUnit(8,14,'MD Tank');
// player2.addUnit(14, 15, 'Battleship');

// playerList.push(player3);
// player3.addUnit(6, 8, 'Rocket Launcher');
// player3.addUnit(6, 9, 'Bomber');
// player3.addUnit(14, 14, 'Battleship');


// playerList.push(player4);
// player4.addUnit(5, 9, 'Rocket Launcher');
// player4.addUnit(4, 9, 'Bomber');
// player4.addUnit(8, 9, 'Recon');
// player4.addUnit(14, 16, 'Battleship');
var uiManager = new UIManager();
var soundManager = new SoundManager();
// var mainGameLoop = new MainGameLoop();