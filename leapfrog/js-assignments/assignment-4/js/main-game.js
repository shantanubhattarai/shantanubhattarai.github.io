import Player from './player.js';
import Enemy from './enemy.js';
import Bullet from './bullet.js';
import Pickup from './pickup.js';
import ScoreManager from './scoreManager.js';

export default function Game(){
  let gameStates = ["MENU", "PLAYING", "GAMEOVER"];
  let scoreManager = new ScoreManager;
  let enemies = [];
  let bullets = [];
  let pickups = []; //collectible
  let drawQueue = [];
  let enemySpeed = 4;
  const container = document.querySelector('.container');

  const scoreHUD = document.createElement('span');
  scoreHUD.style.verticalAlign = "top";
  scoreHUD.textContent = "Score: " +scoreManager.score;

  const lanes = {
    'left' : 150,
    'center' : 450,
    'right' : 750
  }

  var scrollSpeed = 5;
  const CANVAS_WIDTH = 900;
  const CANVAS_HEIGHT = 900;

  let spawnTimeCounter = 0;
  let spawnInterval = 100;


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

  let bulletImage = document.createElement('img');
  bulletImage.src = './img/bullet.png';
  let gameInstanceLoop;
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
      nextIndex++;
      if (nextIndex >= maxEnemyNumber) nextIndex = 0;
    }
  }

  function initializeGame(){
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
      if(drawElement.active) {
        if(drawElement.isEnemy && drawElement.active){
          if(drawElement.checkCollision(player) == "player") {
            gameOver();
          }
          bullets.forEach(bullet => {
            if(bullet.active && drawElement.checkCollision(bullet) == "bullet"){
              bullet.active = false;
              drawElement.active = false;

              bullets = bullets.filter(checkBullet => {
                return checkBullet.active;
              });
              scoreManager.score += 1
            }
          })
          if(drawElement.checkOutOfScreen()) scoreManager.score += 1;
          scoreHUD.textContent = "Score: " + scoreManager.score;
        }
        if(drawElement.isPlayer){
          window.onmousedown = function(e){
            e.preventDefault();
            let bullet = new Bullet(player.x, player.y, 10, 10, bulletImage);
            bullets.push(bullet);
            drawQueue.push(bullet);
          }
        }
        mainCtx.drawImage(drawElement.image, drawElement.x - drawElement.width/2, drawElement.y - drawElement.height/2, drawElement.width, drawElement.height);
        drawElement.move();
      }
    });
  }

  function mainGameLoop(){
    drawAll();
    spawnTimeCounter++;
    if (spawnTimeCounter > spawnInterval){
      spawner();
      spawnTimeCounter = 0;
    }
    if(scoreManager.score > 0 && scoreManager.score % 100 == 0){
      increaseEnemySpeed();
      scoreManager.score += 2;
    }
    if(gameState == "RUNNING") window.requestAnimationFrame(mainGameLoop);
  }

  function gameOver(){
    gameState = "GAMEOVER";
    container.innerHTML = "Game Over";
    let restartButton = document.createElement('button');
    restartButton.textContent = "Restart";
    restartButton.onclick = function(){
      container.innerHTML = "";
      init();
    }
    container.appendChild(restartButton);
  }

  function increaseEnemySpeed(){
    enemySpeed += 1;
    spawnInterval = spawnInterval > 30 ? spawnInterval - 10 : spawnInterval;
    enemies.forEach(enemy => {
      enemy.setSpeed(enemySpeed);
    })
  }

  initializeGame();
  container.appendChild(scoreHUD);
  mainGameLoop();
}

let gameState = "RUNNING";
function init(){
  gameState = "RUNNING";
  let gameInstance = new Game();
}

init();