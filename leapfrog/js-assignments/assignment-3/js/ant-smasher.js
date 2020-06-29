const CANVAS_HEIGHT = window.innerHeight - 8;
const CANVAS_WIDTH = window.innerWidth - 8;

const canvas = document.querySelector('#main-canvas');
canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;
canvas.style.border = '1px solid #333';
const ctx = canvas.getContext('2d');

const splatCanvas = document.querySelector('#splat-canvas');
splatCanvas.height = CANVAS_HEIGHT;
splatCanvas.width = CANVAS_WIDTH;
const splatCtx = splatCanvas.getContext('2d');

function Ball (x, y, radius, speed){
  var self = this;
  this.x = x;
  this.y = y;
  this.speed = speed == 0 ? (Math.random()  * 4) + 1 : speed;
  this.radius = radius;
  this.dx = 1;
  this.dy = 1;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.move = () => {
    wallCollision();
    ballsCollisionDetection();
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
  }

  function wallCollision(){
    if(self.x - self.radius < 0){
      self.x = self.radius;
      self.dx = -self.dx;
    }
    if(self.x + self.radius > CANVAS_WIDTH){
      self.x = CANVAS_WIDTH - self.radius;
      self.dx = -self.dx;
    }
    if(self.y - self.radius < 0 ){
      self.y = self.radius;
      self.dy = -self.dy;
    }
    if(self.y + self.radius > CANVAS_HEIGHT){
      self.y = CANVAS_HEIGHT - self.radius;
      self.dy = -self.dy;
    }
  }

  this.draw = () => {
    ctx.beginPath();
    ctx.drawImage(antImage, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2);
    ctx.stroke();
  }

  function ballsCollisionDetection(){
    for(var i = 0; i < ballsArray.length; i++){
      if(ballsArray[i] != self){
        let distanceX = self.x - ballsArray[i].x;
        let distanceY = self.y - ballsArray[i].y;
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        let directionX = distanceX / distance; //remove distance from distance gives direction
        let directionY = distanceY / distance;

        let combinedRadius = self.radius + ballsArray[i].radius;
        if( distance < combinedRadius){
          overlapX = combinedRadius - Math.abs(distanceX);
          overlapY = combinedRadius - Math.abs(distanceY);
          if(overlapX > overlapY){
            if(distanceY > 0) self.y += overlapY;
            else self.y -= overlapY;
          }else{
            if(distanceX > 0) self.x += overlapX;
            else self.x -= overlapX;
          }
          self.dx = directionX;
          self.dy = directionY;
          ballsArray[i].dx = -directionX;
          ballsArray[i].dy = -directionY;
        }
      }
    }
  }
}

let ballsArray = [];
let numberOfBalls = 10;
let colorArray = ['#70D6FF', '#FF70A6', '#FF9770', '#5C2751', '#92D1C3','#440381','#114B5F','#9DACFF','#F45B69','#F2C57C'];
let antImage = document.createElement('img');
antImage.src = './img/ant_2.png';

let splatImage = document.createElement('img');
splatImage.src = './img/splat.png'

let splatArray = [];

function init(){
  for (var i = 0; i < numberOfBalls; i++){
    //TODO: declare the number as boundary variable
    let randX = (Math.random() * (CANVAS_WIDTH - 18)) + 9;
    let randY = (Math.random() * (CANVAS_HEIGHT - 18)) + 9;
    let randRadius = Math.floor((Math.random() * 15) + 10);
    let newBall = new Ball(randX, randY, randRadius, 0);
    ballsArray.push(newBall);
  }
  drawAll();
}

function drawAll(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (var i = 0; i < numberOfBalls; i++){
    ballsArray[i].draw();
    ballsArray[i].move();
  }
  window.requestAnimationFrame(drawAll);
}

function isIntersecting(point, ball){
  return Math.sqrt((point.x - ball.x) ** 2 + (point.y - ball.y) ** 2) < ball.radius;
}

canvas.addEventListener('click', (e) => {
  const pos = {
    x: e.clientX,
    y: e.clientY
  };
  ballsArray.forEach(ball => {
    if(isIntersecting(pos, ball)){
      splatCtx.drawImage(splatImage, pos.x - ball.radius, pos.y - ball.radius, ball.radius * 2, ball.radius * 2);
      ballsArray = ballsArray.filter(function(value)
      {
        return value != ball;
      });
    }
  });
  numberOfBalls = ballsArray.length;
});

init();