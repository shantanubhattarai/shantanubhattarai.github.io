const CANVAS_HEIGHT = window.innerHeight - 8;
const CANVAS_WIDTH = window.innerWidth - 8;

const canvas = document.querySelector('#main-canvas');
canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;
canvas.style.border = '1px solid #333';
const ctx = canvas.getContext('2d');

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
let numberOfBalls = 40;
let colorArray = ['#70D6FF', '#FF70A6', '#FF9770', '#5C2751', '#92D1C3','#440381','#114B5F','#9DACFF','#F45B69','#F2C57C'];

function init(){
  for (var i = 0; i < numberOfBalls; i++){
    //TODO: declare the number as boundary variable
    let randX = (Math.random() * (CANVAS_WIDTH - 18)) + 9;
    let randY = (Math.random() * (CANVAS_HEIGHT - 18)) + 9;
    let randRadius = Math.floor((Math.random() * 8) + 4);
    let newBall = new Ball(randX, randY, randRadius, 0);
    ballsArray.push(newBall);
  }
  drawAll();
}

function drawAll(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (var i = 0; i < numberOfBalls; i++){
    ctx.beginPath();
    ctx.arc(ballsArray[i].x, ballsArray[i].y, ballsArray[i].radius, 0, 360);
    ctx.fillStyle = ballsArray[i].color;
    ctx.fill();
    ballsArray[i].move();
  }
  window.requestAnimationFrame(drawAll);
}

init();