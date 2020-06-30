/**
 * Declares a bullet
 * @param x starting x position
 * @param y starting y position
 * @param width width of bullet
 * @param height height of bullet
 * @param image for bullet
 */
export default function Bullet(x,y,width, height, image){

  this.active = true;
  this.isBullet = true;
  this.speed = 10;
  this.image = image;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  /** moves by speed every frame */
  this.move = function(){
    this.y -= this.speed;
  }

}