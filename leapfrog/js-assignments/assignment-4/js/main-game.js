import Player from './player.js';
import Enemy from './enemy.js';
import Bullet from './bullet.js';
import Pickup from './pickup.js';


export default function Game(){
  let gameStates = ["MENU", "PLAYING", "GAMEOVER"];
  let enemies = [];
  let pickups = []; //collectible
  let drawQueue = [];
  const container = document.querySelector('.container');
  const lanes = {
    'left' : 150,
    'center' : 450,
    'right' : 750
  }

  var scrollSpeed = 5;
  const CANVAS_WIDTH = 900;
  const CANVAS_HEIGHT = 900;

  let spawnTimeCounter = 0;
  let spawnInterval = 2;


  const playerStartHeight = CANVAS_HEIGHT - 50;
  const enemyStartHeight = -100;
  const maxEnemyNumber = 20;
  //canvas generation
  let mainCanvas = document.createElement('canvas');
  let mainCtx = mainCanvas.getContext('2d');
  mainCanvas.height = CANVAS_HEIGHT;
  mainCanvas.width = CANVAS_WIDTH;

  let player;
  let playerImage = document.createElement('img');
  playerImage.src = './img/player-car.png';

  let enemyImage = document.createElement('img');
  enemyImage.src = './img/enemy-car.png';

  let roadImage = document.createElement('img');
  roadImage.src = './img/road.png';

  function initializeEnemies(){
    for(let i = 0; i < maxEnemyNumber; i++){
      let randomLane = Math.floor(Math.random() * 3);
      let newEnemy = new Enemy(Object.values(lanes)[randomLane], enemyStartHeight, 30, 48, enemyImage);
      enemies.push(newEnemy);
      drawQueue.push(newEnemy);
    }
  }

  let nextIndex = 0;
  function spawner(){
    for(let i = 0; i < Object.keys(lanes).length - 1; i++){
      let randomLane = Math.floor(Math.random() * 3);
      enemies[nextIndex].setLane(Object.values(lanes)[randomLane]);
      enemies[nextIndex].active = true;
      nextIndex++;
      if (nextIndex >= maxEnemyNumber) nextIndex = 0;
    }
  }

  function startGame(){
    container.appendChild(mainCanvas);
    player = new Player(lanes.center, playerStartHeight, 30, 50, playerImage);
    drawQueue.push(player);
    initializeEnemies();
  }

  let roadImageHeight = 0;
  function drawAll(){
    mainCtx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    Object.values(lanes).forEach(xPos => {
      mainCtx.drawImage(roadImage, xPos - 150, roadImageHeight, 300, CANVAS_HEIGHT);
      mainCtx.drawImage(roadImage, xPos - 150, roadImageHeight - CANVAS_HEIGHT, 300, CANVAS_HEIGHT);
      roadImageHeight += scrollSpeed;
      if(roadImageHeight == mainCanvas.height) roadImageHeight = 0;
    });

    drawQueue.forEach(drawElement => {
      mainCtx.drawImage(drawElement.image, drawElement.x - drawElement.width/2, drawElement.y - drawElement.height/2, drawElement.width, drawElement.height);
      if(drawElement.active) drawElement.move();
    });
  }

  function mainGameLoop(){
    drawAll();
    spawnTimeCounter++;
    if (spawnTimeCounter > spawnInterval * 60){
      spawner();
      spawnTimeCounter = 0;
    }
    window.requestAnimationFrame(mainGameLoop);
  }


  startGame();
  mainGameLoop();
}

function init(){
  let gameInstance = new Game();
}

init();