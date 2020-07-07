class MainGameLoop{
  constructor(){
    let self = this;
    this.mapTilesImage = document.createElement('img');
    this.mapTilesImage.src = './img/RoadTiles.png';
    this.canvas = document.querySelector('canvas');
    this.canvas.width = mainMap.cols * mainMap.tsize;
    this.canvas.height = mainMap.rows * mainMap.tsize;
    this.context = this.canvas.getContext('2d');
    this.render();
    this.token = 0;
    this.setToken(0);
    //use mousemove for hover
    this.canvas.addEventListener('click', (e) => {
      // console.log(selectedUnit.actionState.current);
      let rect = self.canvas.getBoundingClientRect();
      let mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }

      let clickedTile = {
        tileX: Math.floor(mousePos.x / mainMap.tsize) + 1,
        tileY: Math.floor(mousePos.y / mainMap.tsize) + 1
      };

      if(selectedUnit !== undefined && selectedUnit.actionState.current == selectedUnit.actionState.prepareMove){
        selectedUnit.moveTo(clickedTile.tileX, clickedTile.tileY);
      }else if(selectedUnit !== undefined && selectedUnit.actionState.current == selectedUnit.actionState.prepareFire){
        var isUnitClicked = false;
        playerList.forEach((valueP) => {
          if(!valueP.active){
            valueP.unitList.forEach((valueU) => {
              if(valueU.getTilePos().tileX == clickedTile.tileX && valueU.getTilePos().tileY == clickedTile.tileY){
                selectedUnit.attack(valueU);
                selectedUnit.actionState.current = selectedUnit.actionState.inactive;
                isUnitClicked = true;
                window.mainGameLoop.switchToken();
              }
            });
          }
        });
        if(!isUnitClicked){
          selectedUnit.drawAttackGrid = false;
          selectedUnit.attackGrid = [];
          selectedUnit.actionState.current = selectedUnit.actionState.selectingAction;
        }
      }else{
        playerList.forEach((valueP) => {
          if(valueP.active){
            valueP.unitList.forEach((valueU) => {
              if(valueU.getTilePos().tileX == clickedTile.tileX && valueU.getTilePos().tileY == clickedTile.tileY){
                  valueU.startMovement();
                  selectedUnit = valueU;
                  selectedUnit.actionState.current = selectedUnit.actionState.prepareMove;
              }
            });
          }
        });
      }
    });
  }

  setToken = (playerIdx) =>{
    this.token = playerIdx;
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
        actionMenu.style.display = 'block';
      }else{
        actionMenu.style.display = 'none';
      }
    }
  }

  init(){

  }

  render(){
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.drawLayer(0);
    this.drawLayer(1);
    playerList.forEach(player => {
      player.unitList.forEach(unit => unit.draw(this.context));
    })
    this.update();
    window.requestAnimationFrame(this.render.bind(this));
  }
}

const playerList = [];

let player1 = new Player('red');
playerList.push(player1);
player1.addUnit(10,10,3,3);
player1.addUnit(11,12,3,3);
let player2 = new Player('blue');
playerList.push(player2);
player2.addUnit(10,20,3,3);

var mainGameLoop = new MainGameLoop();

