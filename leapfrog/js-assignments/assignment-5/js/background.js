import DrawableObject from './drawableObject.js'
/** Declares background to draw and move the background objects
 * @param sX x coordinate in sprite image
 * @param sY y coordinate in sprite image
 * @param w width in sprite image and to draw
 * @param h width in sprite image and to draw
 * @param x x coordinate in canvas space
 * @param y y coordinate in canvas space
 * @param dx x movement speed
*/
export default class Background extends DrawableObject{
  constructor(sX, sY, w, h, x, y, dx){
    super(sX, sY, w, h, x, y);
    this.dx = dx;
  }
  /** Draws the background twice one after another
   * @param ctx context to draw on
   * @param sprite sprite to extract background from
  */
  draw = (ctx, sprite) => {
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
  }
  /** Updates the x position of the background if in game state
   * @param gameState object, state of the game
   */
  update = (gameState) => {
    if(gameState.current == gameState.game){
      if(this.x > -this.w/2){
        this.x = (this.x - this.dx);
      }else{
        this.x = 0;
      }
    }
  }
}