export default function Enemy(x, y, width, height, image){
  let self = this;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.image = image;
  this.active = false;

  this.move = function (){
    if(this.active){this.y += 5;}
    if(this.y > 1000) this.active = false;
  }

  this.setLane = function(laneX){
    this.x = laneX;
    this.y = y;
  }

  function checkCollision(){
    //with player, with boundary, with bullet
  }

}