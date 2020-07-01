//separate all constants into a constants file so it can be accessed by all modules
const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');
let frames = 0;

const sprite = new Image();
sprite.src = "img/sprite.png"

const gameState = {
  'current': 0,
  'getReady': 0,
  'game': 1,
  'gameOver' : 2
}

document.addEventListener('click', function(e){
  if(gameState.current == gameState.getReady){
    gameState.current = gameState.game;
    getReadyImage.active = false;
    newBird.active = true;
    gameOverImage.active = false;
  }else if(gameState.current == gameState.game){
    newBird.flap();
  }else if(gameState.current == gameState.gameOver){
    gameState.current = gameState.getReady;
    newBird.resetSpeed();
    pipeManager.reset();
    scoreManager.resetScore();
    gameOverImage.active = false;
    newBird.active = false;
    getReadyImage.active = true;
  }
});

class DrawableObject {
  constructor(sX, sY, w, h, x, y){
    this.sX = sX;
    this.sY = sY;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.animation = [];
    this.frame = 0;
    this.active = false;
  }

  draw = () => {
    if(this.active){
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
  }
};

class Background extends DrawableObject{
  constructor(sX, sY, w, h, x, y, dx){
    super(sX, sY, w, h, x, y);
    this.dx = dx;
  }
  draw = () => {
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
  }
  update = () => {
    if(gameState.current == gameState.game){
      if(this.x > -this.w/2){
        this.x = (this.x - this.dx);
      }else{
        this.x = 0;
      }
    }
  }
}

class Bird extends DrawableObject{
  constructor(sX, sY, w, h, x, y, radius){
    super(sX, sY, w, h, x, y);
    this.animation = [
      {sX: 276, sY: 112},
      {sX: 276, sY: 139},
      {sX: 276, sY: 164},
      {sX: 276, sY: 139}
    ];
    this.initX = x;
    this.initY = y;
    this.frame = 0;
    this.speed = 0;
    this.gravity = 0.25;
    this.jumpForce = 4.6;
    this.rotation = 0;
    this.radius = radius;
  }

  draw = () => {
    if(this.active){
      let currentSpritePosition = this.animation[this.frame];

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI/180);
    ctx.drawImage(sprite, currentSpritePosition.sX, currentSpritePosition.sY,
                  this.w, this.h, - this.w/2, - this.h/2,
                  this.w, this.h);
    }

    ctx.restore();
  }

  flap = () => {
    this.speed = -this.jumpForce;
  }

  update = () => {
    if (this.active){
      if(frames % 5 == 0){
        if(this.frame < this.animation.length - 1) this.frame++;
        else this.frame = 0;
      }


      if(this.speed > this.jumpForce){
        this.rotation = 90;
        this.frame = 1;
      }else{
        this.rotation = -25;
      }


      this.speed += this.gravity;
      this.y += this.speed;

      if(this.y <= 0)
      {
        this.y = 0;
      }

      if(this.y + this.h/2 >= canvas.height - backgroundTopLayer.h){

        this.y = canvas.height - backgroundTopLayer.h - this.h /2;
        gameOver();
      }


    }
  }

  resetSpeed = () =>{
    this.speed = 0;
    this.x = this.initX;
    this.y = this.initY;
  }
}

class PipeManager{
  constructor(dx, gap, maxYPos){
    this.bottom = {sX: 502, sY: 0};
    this.top = {sX: 553, sY: 0};
    this.w = 53;
    this.h = 400;
    this.position = [];
    this.dx = dx;
    this.gap = gap;
    this.maxYPos = maxYPos;
    this.active = false;
  }

  draw = () => {
    for(let i = 0; i < this.position.length; i++){
      let p = this.position[i];
      let topYPos = p.y;
      let bottomYPos = p.y + this.h + this.gap;

      ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);

      ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);
    }
  }

  update = () =>{
    if (gameState.current !== gameState.game) return;

    if(frames % 100 == 0){
      this.position.push({
        x: canvas.width,
        y: this.maxYPos * (Math.random() + 1)
      });
    }

    for( let i = 0; i < this.position.length; i++){
      let p = this.position[i];
      p.x -= this.dx;
      let bottomPipeYPos = p.y + this.h + this.gap;

      //collision
      if(newBird.x + newBird.radius > p.x && newBird.x - newBird.radius < p.x + this.w &&
        newBird.y + newBird.radius > p.y && newBird.y - newBird.radius < p.y + this.h){
          gameOver();
      }

      if(newBird.x + newBird.radius > p.x && newBird.x - newBird.radius < p.x + this.w &&
        newBird.y + newBird.radius > bottomPipeYPos && newBird.y - newBird.radius < bottomPipeYPos + this.h){
          gameOver();
      }

      if(p.x + this.w <= 0){
        this.position.shift();
        scoreManager.score += 1;
        scoreManager.highScore = scoreManager.score > scoreManager.highScore ? scoreManager.score : scoreManager.highScore;
        localStorage.setItem('highScore', ScoreManager.highScore);
      }
    }
  }

  reset = () =>{
    this.position = [];
  }

}

class ScoreManager{
  constructor(){
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
  }
  draw = () => {
    ctx.fillStyle = "#FFF";

    if(gameState.current == gameState.game){
      ctx.font = "35px Teko";
      ctx.fillText(this.score, canvas.width/2, 50);
    }else if (gameState.current == gameState.gameOver){
      ctx.font = "25px Teko";
      ctx.fillText(this.score, 150, 186);
      ctx.fillText(this.highScore, 150, 228);
    }
  }
  resetScore = () => {
    this.score = 0;
  }
}

let newBird = new Bird(276, 112, 34, 26, 50, 150, 12);
let background = new Background(0, 0, 275, 226, 0, canvas.height - 226, 0.1);
let backgroundTopLayer = new Background(276, 0, 224, 112, 0, canvas.height - 112, 2);
let getReadyImage = new DrawableObject(0, 228, 173, 152, canvas.width/2 - 173/2, 200);
let gameOverImage = new DrawableObject(175, 228, 225, 160, canvas.width/2 - 225/2, 90);
let pipeManager = new PipeManager(2, 100, -150);
let scoreManager = new ScoreManager();

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle="#70c5ce";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  background.draw();
  backgroundTopLayer.draw();
  pipeManager.draw();
  newBird.draw();
  getReadyImage.draw();
  gameOverImage.draw();
  scoreManager.draw();
}

function update(){
  newBird.update();
  background.update();
  backgroundTopLayer.update();
  pipeManager.update();
}

function loop(){
  update();
  draw();
  frames++;
  window.requestAnimationFrame(loop);
}

function gameOver(){
  if(gameState.current == gameState.game) {
    gameState.current = gameState.gameOver;
    gameOverImage.active = true;
  }
}

function init(){
  getReadyImage.active = true;
}
init();
loop();