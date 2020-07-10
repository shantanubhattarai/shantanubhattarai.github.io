class UIManager{
  constructor(){
    this.turnIndicator = document.querySelector('.turn-indicator');
    this.turnIndicatorBlock = document.querySelector('.turn-indicator-block');
    this.turnTextElement = document.querySelector('.turn-text');
    this.actionsText = document.querySelector('.actions-text');
    this.unitMenu = document.querySelector('.unit-menu');
    this.addOnClickEventsToUnitMenu();
    this.actionMenu = document.querySelector('.action-menu');
    this.actionMenuMove = document.querySelector('li#move');
    this.actionMenuLoad = document.querySelector('li#load');
    this.actionMenuDrop = document.querySelector('li#drop');
    this.actionMenuCapture = document.querySelector('li#capture');
    this.actionMenuAttack = document.querySelector('li#attack');
    this.actionMenuWait = document.querySelector('li#wait');
    this.actionMenuCancel = document.querySelector('li#cancel');
    this.endTurnButton = document.querySelector('.end-turn');
    this.initEndTurn();
    this.initActionMenu();
    this.turnColors = {
      'red': '#f84848',
      'blue': '#4070f8',
      'green': '#38c028',
      'yellow': '#c0b800'
    }
  }

  initEndTurn(){
    this.endTurnButton.onclick = () => {
      window.mainGameLoop.switchToken();
    }
  }

  initMoveClick(){
    this.actionMenuMove.onclick = () => {
      selectedUnit.startMovement();
      selectedUnit.actionState.current = selectedUnit.actionState.prepareMove;
      selectedUnit.actionState.currentState = 'idle';
    }
  }

  initCaptureClick(){
    this.actionMenuCapture.onclick = () => {
      buildingsList.forEach((building) => {
        if(building.tileX == selectedUnit.tileX && building.tileY == selectedUnit.tileY){
          building.captureProgress += 50;
          if(building.captureProgress == 100){
            building.getCaptured(currentPlayer);
          }
        }
      });
      selectedUnit.movementPath = [];
      selectedUnit.actionState.current = selectedUnit.actionState.inactive;
      selectedUnit.actionState.currentState = 'inactive';
      currentPlayer.increaseCounter();
      //window.mainGameLoop.switchToken();
    }
  }

  initAttackClick(){
    this.actionMenuAttack.onclick = () => {
      selectedUnit.actionState.current = selectedUnit.actionState.prepareFire;
      selectedUnit.actionState.currentState = 'idle';
      selectedUnit.startAttack();
    }
  }

  initWaitClick(){
    this.actionMenuWait.onclick = () => {
      let oldSelectedUnit = selectedUnit;
      selectedUnit.movementPath = [];
      if(selectedUnit.loadedUnit !== undefined && selectedUnit.loadedUnit !== ''){
        currentPlayer.increaseCounter();
        selectedUnit = oldSelectedUnit;
      }

      selectedUnit.actionState.current = selectedUnit.actionState.inactive;
      selectedUnit.actionState.currentState = 'inactive';
      currentPlayer.increaseCounter();
      //window.mainGameLoop.switchToken();
    }
  }

  initCancelClick(){
    this.actionMenuCancel.onclick = () => {
      selectedUnit.revertMove();
    }
  }

  initLoadClick(){
    this.actionMenuLoad.onclick = () => {
      if(selectedUnit.loadedUnit !== undefined && selectedUnit.loadedUnit == ''){
        selectedUnit.generateLoadTiles();
        selectedUnit.actionState.current = selectedUnit.actionState.prepareLoad;
      }
    }
  }

  initDropClick(){
    this.actionMenuDrop.onclick  = () => {
      selectedUnit.actionState.current = selectedUnit.actionState.prepareDrop;
      selectedUnit.generateDropTiles();
    }
  }

  initActionMenu(){
    this.actionMenuCapture.style.display= 'none';
    this.initMoveClick();
    this.initCaptureClick();
    this.initAttackClick();
    this.initWaitClick();
    this.initCancelClick();
    this.initLoadClick();
    this.initDropClick();
    this.actionMenu.style.display = 'none';
  }

  addOnClickEventsToUnitMenu(){
    let unitMenuListItems = Array.from(document.querySelectorAll('.unit-menu-list > li'));
    unitMenuListItems.forEach((unitMenuListItem) => {
      unitMenuListItem.onclick = () => {
        selectedFactory.spawnUnit(unitMenuListItem.textContent, this.unitMenu);
        selectedFactory == undefined;
      };
    });
    this.unitMenu.style.display = 'none';
  }

  showMenu(){
    if(selectedUnit !== undefined && selectedUnit.actionState.current == selectedUnit.actionState.selectingAction){
      this.showCaptureIfBuilding();
      this.showLoadDrop();
      this.showMove();
      this.hideAttack();
      this.actionMenu.style.display = 'inline-block';
    }else{
      this.actionMenu.style.display = 'none';
    }
  }

  showCaptureIfBuilding(){
    if(
      mainMap.getTileIsBuilding(selectedUnit.tileX-1, selectedUnit.tileY-1)
      && (selectedUnit.type == 'Infantry' || selectedUnit.type == 'Mech')
    ){
      this.actionMenuCapture.style.display = 'block';
      buildingsList.forEach((building) => {
        if((building.capturedBy == this.token && building.tileX == selectedUnit.tileX && building.tileY == selectedUnit.tileY)){
          this.actionMenuCapture.style.display = 'none';
        }
      });
    }else{
      this.actionMenuCapture.style.display = 'none';
    }
  }

  showLoadDrop(){
    if(selectedUnit.loadedUnit !== undefined && selectedUnit.loadedUnit == ''){
      this.actionMenuLoad.style.display = 'block';
    }else{
      this.actionMenuLoad.style.display = 'none';
    }

    if(selectedUnit.loadedUnit !== undefined && selectedUnit.loadedUnit !== ''){
      this.actionMenuDrop.style.display = 'block';
    }else{
      this.actionMenuDrop.style.display = 'none';
    }

  }

  showMove(){
    if(selectedUnit !== undefined && selectedUnit.movementPath.length == 0){
      this.actionMenuMove.style.display = 'block';
    }else{
      this.actionMenuMove.style.display = 'none';
    }
  }

  hideAttack(){
    if((selectedUnit.actionCount == 1 && selectedUnit.movementPath.length > 0) || selectedUnit.attack == -1){
      this.actionMenuAttack.style.display=  'none';
    }else{
      this.actionMenuAttack.style.display=  'block';
    }
  }

  displayTurn(){
    let turnText = currentPlayer.color + ' Turn';
    turnText = turnText.toUpperCase();
    this.turnTextElement.textContent = turnText;
    this.turnIndicatorBlock.style.backgroundColor = this.turnColors[currentPlayer.color];
  }

  displayActions(){
    let actionsText = 'Actions left: ';
    actionsText += currentPlayer.actions - currentPlayer.actionCounter;
    actionsText += ' / ' + currentPlayer.actions;
    this.actionsText.textContent = actionsText;
  }

  update(){
    if(currentPlayer !== undefined) {
      this.showMenu();
      this.displayTurn();
      this.displayActions();
    }
  }
}

