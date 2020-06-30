export default function Enemy(x, y, width, height, image){

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.image = image;

  this.move = function (){
    this.y += 5;
  }

  function checkCollision(){
    //with player, with boundary, with bullet
  }

}