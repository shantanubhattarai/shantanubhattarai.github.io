import Player from './player.js';
import Enemy from './enemy.js';
import Bullet from './bullet.js';
import ScoreManager from './scoreManager.js';

export default function Game(){
  let scoreManager = new ScoreManager;
  let enemies = [];
  let bullets = [];
  let drawQueue = [];
  let enemySpeed = 4;
  const container = document.querySelector('.container');

  const scoreHUD = document.createElement('span');
  scoreHUD.style.verticalAlign = "top";
  scoreHUD.textContent = "Score: " +scoreManager.score;

  let bulletTimer = 0;
  let cooldown = 400;

  const bulletHUD = document.createElement('span');
  bulletHUD.style.verticalAlign = "top";
  bulletHUD.textContent = "Bullet Cooldown: " + Math.ceil((cooldown - bulletTimer)/ 100);

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

  function initializeEnemies(){
    for(let i = 0; i < maxEnemyNumber; i++){
      let randomLane = Math.floor(Math.random() * 3);
      let newEnemy = new Enemy(Object.values(lanes)[randomLane], enemyStartHeight, 30, 48, enemyImage);
      newEnemy.active = false;
      enemies.push(newEnemy);
      drawQueue.push(newEnemy);
    }
  }
  let bullet;
  let nextIndex = 0;
  function spawner(){
    let randomLane = Math.floor(Math.random() * 3);
    enemies[nextIndex].setLane(Object.values(lanes)[randomLane]);
    nextIndex++;
    if (nextIndex >= maxEnemyNumber) nextIndex = 0;
    let randomLane2 = Math.floor(Math.random() * 3);
    if(!(randomLane2 == randomLane)){
      enemies[nextIndex].setLane(Object.values(lanes)[randomLane2]);
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

          if(bullet && bullet.active && drawElement.checkCollision(bullet) == "bullet"){
            bullet.active = false;
            drawElement.active = false;
            scoreManager.score += 1
          }

          if(drawElement.checkOutOfScreen()) scoreManager.score += 1;
        }
        if(drawElement.isPlayer){
          window.onmousedown = function(e){
            if(bulletTimer > cooldown){
              bulletTimer = 0;
              e.preventDefault();
              bullet = new Bullet(player.x, player.y, 10, 10, bulletImage);
              bullet.active = true;
              drawQueue.push(bullet);
            }
          }
        }
        mainCtx.drawImage(drawElement.image, drawElement.x - drawElement.width/2, drawElement.y - drawElement.height/2, drawElement.width, drawElement.height);
        drawElement.move();
        scoreHUD.textContent = "Score: " + scoreManager.score;
        bulletHUD.textContent = "Bullet Cooldown: ";
        bulletHUD.textContent += Math.ceil((cooldown - bulletTimer) / 100) < 0 ? 0 : Math.ceil((cooldown - bulletTimer) / 100);
      }
    });

    drawQueue = drawQueue.filter(drawElement => {
      return !(drawElement.isBullet && !drawElement.active);
    });
  }

  function mainGameLoop(){
    drawAll();
    spawnTimeCounter++;
    bulletTimer++;
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
    container.innerHTML = "";
    container.classList.add('game-over-container');
    let gameOverTitle = document.createElement('h1');
    gameOverTitle.classList.add('game-over-title');
    gameOverTitle.textContent = "Game Over!";
    container.append(gameOverTitle);
    let restartButton = document.createElement('button');
    restartButton.textContent = "Restart";
    restartButton.classList.add('restart-btn');
    restartButton.onclick = function(){
      container.innerHTML = "";
      container.classList.remove('game-over-container');
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
  container.appendChild(bulletHUD);
  mainGameLoop();
}

let gameState = "RUNNING";
function init(){
  document.querySelector('.start-menu').style.display= 'none';
  gameState = "RUNNING";
  let gameInstance = new Game();
}

let startButton = document.querySelector('.start-btn');
startButton.onclick = function(){
  init();
}
