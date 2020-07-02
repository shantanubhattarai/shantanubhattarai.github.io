/** Declares Pipe Manager class, handles pipe drawing, moving and collision
 * @param dx movement speed for pipes
 * @param gap vertical gap between two pipes in same column
 * @param maxYPos maximum the pipe can go up from the screen
 */
export default class PipeManager{
  constructor(dx, gap, maxYPos){
    this.bottom = {sX: 502, sY: 0};
    this.top = {sX: 553, sY: 0};
    this.w = 53;
    this.h = 400;
    this.position = [];
    this.dx = dx;
    this.gap = gap;
    this.maxYPos = maxYPos;
    this.active = false;
  }

  /** draws object using sprite
   * @param ctx context to draw on
   * @param sprite to extract object from
   */
  draw = (ctx, sprite) => {
    for(let i = 0; i < this.position.length; i++){
      let p = this.position[i];
      let topYPos = p.y;
      let bottomYPos = p.y + this.h + this.gap;

      ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);

      ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);
    }
  }

  /**
   * Updates the pipe manager
   * @param canvas canvas to draw on
   * @gamestate object, state of the game
   * @newBird references the player bird
   * @scoreMnaager references the scoreManager object
   * @main references the main game
  */
  update = (canvas, gameState, newBird, scoreManager, main) =>{
    if (gameState.current !== gameState.playing) return;

    if(main.frames % 100 == 0){
      this.position.push({
        x: canvas.width,
        y: this.maxYPos * (Math.random() + 1)
      });
    }

    for( let i = 0; i < this.position.length; i++){
      let p = this.position[i];
      p.x -= this.dx;

      this.handleCollision(newBird, p, main);

      if(p.x + this.w <= 0){
        this.position.shift();
        scoreManager.score += 1;
        scoreManager.highScore = scoreManager.score > scoreManager.highScore ? scoreManager.score : scoreManager.highScore;
        localStorage.setItem('highScore', scoreManager.highScore);
      }
    }
  }
  /** Handles collision between pipe and player bird
   * @param newBird references the player bird
   * @param p position of pipe
   * @param main references main game
  */
  handleCollision = (newBird, p, main) => {
    let bottomPipeYPos = p.y + this.h + this.gap;
    if(newBird.x + newBird.radius > p.x && newBird.x - newBird.radius < p.x + this.w &&
      newBird.y + newBird.radius > p.y && newBird.y - newBird.radius < p.y + this.h){
        main.gameOver();
    }

    if(newBird.x + newBird.radius > p.x && newBird.x - newBird.radius < p.x + this.w &&
      newBird.y + newBird.radius > bottomPipeYPos && newBird.y - newBird.radius < bottomPipeYPos + this.h){
        main.gameOver();
    }
  }

  /** resets position array to empty */
  reset = () =>{
    this.position = [];
  }

}