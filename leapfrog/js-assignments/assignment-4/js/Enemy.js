/**
 * Declares an enemy
 * @param x starting x position
 * @param y starting y position
 * @param width width of enemy
 * @param height height of enemy
 * @param image for enemy
 */
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

  /** Move by speed every frame */
  this.move = function (){
    if(this.active){
      this.y += this.speed;
    }
  }

  /** Check if enemy is out of screen */
  this.checkOutOfScreen = function(){
    if(this.y > 1000) {
      this.active = false;
      return true;
    }
    return false;
  }

  /** set x positoin to given lane and reset y position
   * @param laneX x position of lane to switch to
   */
  this.setLane = function(laneX){
    this.x = laneX;
    this.y = y;
    this.active = true;
  }

  /** Checks collision with given obejct
   * @collider object to check collision with
   */

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

  /** sets the speed to given speed
   * @param speed the speed to change to
   */
  this.setSpeed = function (speed){
    this.speed = speed;
  }

}