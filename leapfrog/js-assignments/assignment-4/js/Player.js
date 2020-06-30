export default function Player(x, y, width, height, image) {
  let self = this;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.image = image;

  this.move = function(){
    //on keypress a and d
    window.onkeydown = function(e) {
      var kc = e.keyCode;
      e.preventDefault();
      if (kc === 65){
        if(self.x - 300 >= 150) self.x -= 300;
      }
      if(kc === 68){
        if(self.x + 300 <= 750) self.x += 300;
      }
    }
  }

  function replenishAmmo(){

  }

  function shoot(){

  }

  function draw(){

  }

}