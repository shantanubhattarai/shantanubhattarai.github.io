/** Declares individual dots
 * @param ctx Context to draw on
 * @param isOutOfPhase Boolean, phase 180 deg if true, 0 deg if false
 */
export default class Dot {
  constructor(ctx, isOutOfPhase) {
    this.ctx = ctx;
    this.radius = 10;

    this.radiusAmp = 10;
    this.amplitude = 80;

    this.posX = 100;
    this.posY = 100;

    this.offsetX = 0;
    this.offsetY = 100;
    this.color = '#ff9';

    this.phase = isOutOfPhase ? Math.PI : 0;
  }

  /** Draws the dot */
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
  }

  /** Updates x position
   * gets y position from sine of x, gets radius from cos of x
   * this makes radius 0 at the highest and lowest points of y
   */
  update() {
    this.offsetX = (this.offsetX + 1) % 180;
    this.posY = this.amplitude * Math.sin(((this.offsetX * Math.PI)) / 180 + this.phase) + this.offsetY;

    this.radius = (this.radiusAmp / 2) * Math.cos((this.offsetX * Math.PI) / 180 + this.phase) + this.radiusAmp / 2;

  }

  /** Convets given parameter to hexadecimal
   * @param number value from 0 to 255 to get hex from
   */
  toHex(number) {
    var hex = Number(number).toString(16);

    if (hex.length <= 1) hex = '0' + hex;

    return hex;
  }
}