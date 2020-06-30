const CANVAS_HEIGHT = window.innerHeight - 8;
const CANVAS_WIDTH = window.innerWidth - 8;

const container = document.querySelector('.container');

/** Get main canvas and its context */
const canvas = document.querySelector('#main-canvas');
canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;
canvas.style.border = '1px solid #333';
const ctx = canvas.getContext('2d');

/** Get bottom canvas for splats and its context */
const splatCanvas = document.querySelector('#splat-canvas');
splatCanvas.height = CANVAS_HEIGHT;
splatCanvas.width = CANVAS_WIDTH;
const splatCtx = splatCanvas.getContext('2d');

/**
 * Implements an Ant
 * @param x starting x coordinate
 * @param y starting y coordinate
 * @param radius radius for the box hitbox
 * @param speed movement speed of ant
 */
function Ant (x, y, radius, speed){
  var self = this;
  this.x = x;
  this.y = y;
  this.speed = speed == 0 ? (Math.random()  * 3) + 1 : speed;
  this.radius = radius;
  this.dx = 1;
  this.dy = 1;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  /** Moves the ant by dx multiplied by speed */
  this.move = () => {
    wallCollision();
    antsCollisionDetection();
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
  }

  /** Handles collision with boundary walls */
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

  /** Draws the image on the canvas */
  this.draw = () => {
    ctx.beginPath();
    ctx.drawImage(antImage, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2);
    ctx.stroke();
  }

  /** Handles collision with other ants */
  function antsCollisionDetection(){
    for(var i = 0; i < antsArray.length; i++){
      if(antsArray[i] != self){
        let distanceX = self.x - antsArray[i].x;
        let distanceY = self.y - antsArray[i].y;
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        let directionX = distanceX / distance;
        let directionY = distanceY / distance;

        let combinedRadius = self.radius + antsArray[i].radius;
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
          antsArray[i].dx = -directionX;
          antsArray[i].dy = -directionY;
        }
      }
    }
  }
}

let antsArray = [];
let numberOfAnts = 50;
let colorArray = ['#70D6FF', '#FF70A6', '#FF9770', '#5C2751', '#92D1C3','#440381','#114B5F','#9DACFF','#F45B69','#F2C57C'];
let antImage = document.createElement('img');
antImage.src = './img/ant_2.png';

let splatImage = document.createElement('img');
splatImage.src = './img/splat.png'

let splatArray = [];
const BOUNDARY_PADDING = 18;
const MAX_RADIUS = 30;
const MIN_RADIUS = 20;

/** Initialize all ants specified by number */
function init(){
  for (var i = 0; i < numberOfAnts; i++){
    let randX = (Math.random() * (CANVAS_WIDTH - BOUNDARY_PADDING)) + BOUNDARY_PADDING/2;
    let randY = (Math.random() * (CANVAS_HEIGHT - BOUNDARY_PADDING)) + BOUNDARY_PADDING/2;
    let randRadius = Math.floor((Math.random() * MAX_RADIUS) + MIN_RADIUS);
    let newAnt = new Ant(randX, randY, randRadius, 0);
    antsArray.push(newAnt);
  }
  drawAll();
}
/** draw all elements in antsArray */
function drawAll(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (var i = 0; i < numberOfAnts; i++){
    antsArray[i].draw();
    antsArray[i].move();
  }
  window.requestAnimationFrame(drawAll);
}

let numberOfClicks = 0;
let playAgainButton = document.createElement('button');
playAgainButton.className = "play-again";
playAgainButton.textContent = "Play Again";

/** Check if two points are intersecting
 * @param point mouse pointer location
 * @param ant ant location
*/
function isIntersecting(point, ant){
  return Math.sqrt((point.x - ant.x) ** 2 + (point.y - ant.y) ** 2) < ant.radius;
}

/** Handle clicks on the canvas */
canvas.addEventListener('mousedown', (e) => {
  numberOfClicks++;
  const pos = {
    x: e.clientX,
    y: e.clientY
  };

  /** Remove ant from render queue */
  antsArray.forEach(ant => {
    if(isIntersecting(pos, ant)){
      splatCtx.drawImage(splatImage, pos.x - ant.radius, pos.y - ant.radius, ant.radius * 2, ant.radius * 2);
      antsArray = antsArray.filter(function(value)
      {
        return value != ant;
      });
    }
  });

  numberOfAnts = antsArray.length;

  /** end game message*/
  if(numberOfAnts == 0){
    container.innerHTML = "<h1>You Win!</h1>";
    container.innerHTML += "<h3>Number of Clicks: " + numberOfClicks + "</h3>";
    container.appendChild(playAgainButton);
  }
});

/** Reload game on play again button */
playAgainButton.onclick = () => {
  location.reload();
}

init();