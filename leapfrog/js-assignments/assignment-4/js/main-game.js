let gameStates = ["MENU", "PLAYING", "GAMEOVER"];
let enemies = []; //object pool this shit
let pickup; //collectible
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
let spawnInterval = 1;

function Bullet(){

  function move(){
    //y--;
  }

}
const playerStartHeight = CANVAS_HEIGHT - 50;
const enemyStartHeight = -100;
//take in what to spawn and spawn it using an algorithm, player fairness esma
//maintain a minimum time between spawns, just do that. don't think too much


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

function spawner(){
  //object pool the enemies and pickups
  randomLane = Math.floor(Math.random() * 3);
  enemy = new Enemy(Object.values(lanes)[randomLane], enemyStartHeight, 30, 48, enemyImage);
  drawQueue.push(enemy);

  randomLane2 = Math.floor(Math.random() * 3);
  if(!(randomLane == randomLane2)){
    enemy2 = new Enemy(Object.values(lanes)[randomLane2], enemyStartHeight, 30, 48, enemyImage);
    drawQueue.push(enemy2);
  }
}

function startGame(){
  container.appendChild(mainCanvas);
  player = new Player(lanes.center, playerStartHeight, 30, 50, playerImage);
  drawQueue.push(player);
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
    drawElement.move();
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

function init(){
  startGame();
  mainGameLoop();

  //append canvas to container
}

init();