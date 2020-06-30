export default function Bullet(x,y,width, height, image){

  this.active = true;
  this.isBullet = true;
  this.speed = 10;
  this.image = image;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.move = function(){
    this.y -= this.speed;
  }

}