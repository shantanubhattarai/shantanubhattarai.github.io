export default function Enemy(x, y, width, height, image){
  let self = this;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.image = image;
  this.active = false;
  this.isEnemy = true;
  this.speed = 4;

  this.move = function (){
    if(this.active){
      this.y += this.speed;
    }
  }

  this.checkOutOfScreen = function(){
    if(this.y > 1000) {
      this.active = false;
      return true;
    }
    return false;
  }

  this.setLane = function(laneX){
    this.x = laneX;
    this.y = y;
    this.active = true;
  }

  this.checkCollision = function(collider){
    let distanceX = self.x - collider.x;
    let distanceY = self.y - collider.y;
    let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    if(distance < collider.width/2 + self.width/2){
      if(collider.isPlayer){
        return "player";
      }
      if(collider.isBullet){
        return "bullet";
      }
    }
  }

  this.setSpeed = function (speed){
    this.speed = speed;
  }

}