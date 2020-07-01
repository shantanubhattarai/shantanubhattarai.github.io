import DrawableObject from './drawableObject.js';

/** Declares bird to draw and move the bird object
 * @param sX x coordinate in sprite image
 * @param sY y coordinate in sprite image
 * @param w width in sprite image and to draw
 * @param h width in sprite image and to draw
 * @param x x coordinate in canvas space
 * @param y y coordinate in canvas space
 * @param radius radius of collision circle for bird
*/
export default class Bird extends DrawableObject{
  constructor(sX, sY, w, h, x, y, radius){
    super(sX, sY, w, h, x, y);
    this.animation = [
      {sX: 276, sY: 112},
      {sX: 276, sY: 139},
      {sX: 276, sY: 164},
      {sX: 276, sY: 139}
    ];
    this.initX = x;
    this.initY = y;
    this.frame = 0;
    this.speed = 0;
    this.gravity = 0.25;
    this.jumpForce = 4.6;
    this.rotation = 0;
    this.radius = radius;
  }

  /** Draws the bird and rotates it
   * @param ctx context to draw on
   * @param sprite sprite to extract background from
  */
  draw = (ctx, sprite) => {
    if(this.active){
      let currentSpritePosition = this.animation[this.frame];

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation * Math.PI/180);
      ctx.drawImage(sprite, currentSpritePosition.sX, currentSpritePosition.sY,
                    this.w, this.h, - this.w/2, - this.h/2,
                    this.w, this.h);
    }

    ctx.restore();
  }

  /** Flap to gain height */
  flap = () => {
    this.speed = -this.jumpForce;
  }

  /** Updates position, animates, set rotation and handles gravity
   * @param canvas canvas to draw on
   * @param backgroundTopLayer floor on top of background
   * @param main references main game object
   */
  update = (canvas, backgroundTopLayer, main) => {
    if (this.active){
      if(main.frames % 5 == 0){
        if(this.frame < this.animation.length - 1) this.frame++;
        else this.frame = 0;
      }

      if(this.speed > this.jumpForce){
        this.rotation = 90;
        this.frame = 1;
      }else{
        this.rotation = -25;
      }

      this.speed += this.gravity;
      this.y += this.speed;

      if(this.y <= 0){
        this.y = 0;
        main.gameOver();
      }

      if(this.y + this.h/2 >= canvas.height - backgroundTopLayer.h){
        this.y = canvas.height - backgroundTopLayer.h - this.h /2;
        main.gameOver();
      }
    }
  }

  /** Resets speed and position to initials after restarting */
  resetSpeed = () =>{
    this.speed = 0;
    this.x = this.initX;
    this.y = this.initY;
  }
}