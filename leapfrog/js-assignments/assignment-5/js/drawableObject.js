/** Declares parent class for all drawable objects
 * @param sX x coordinate in sprite image
 * @param sY y coordinate in sprite image
 * @param w width in sprite image and to draw
 * @param h width in sprite image and to draw
 * @param x x coordinate in canvas space
 * @param y y coordinate in canvas space
*/
export default class DrawableObject {
  constructor(sX, sY, w, h, x, y){
    this.sX = sX;
    this.sY = sY;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.animation = [];
    this.frame = 0;
    this.active = false;
  }

  /** draws object using sprite
   * @param ctx context to draw on
   * @param sprite to extract object from
   */
  draw = (ctx, sprite) => {
    if(this.active){
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
  }
};