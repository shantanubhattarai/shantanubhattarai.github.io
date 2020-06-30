/**
 * Declares the Player
 * @param x starting x position
 * @param y starting y position
 * @param width width of Player
 * @param height height of Player
 * @param image for Player
 */
export default function Player(x, y, width, height, image) {
  let self = this;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.image = image;
  this.active = true;
  this.isPlayer = true;

  /**Handles a and d buttons for movement */
  this.move = function(){
    //on keypress a and d
    window.onkeydown = function(e) {
      var kc = e.keyCode;
      if (kc === 65){
        if(self.x - 300 >= 150) self.x -= 300;
      }
      if(kc === 68){
        if(self.x + 300 <= 750) self.x += 300;
      }
    }
  }

}