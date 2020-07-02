/** Manages score in the game */

export default class ScoreManager{
  constructor(){
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
  }
  /** Handles drawing of scoreboard and score text
   * @param ctx context to draw on
   * @param gameState state the game is in, gameState object
   * @param canvas canvas to draw on
   */
  draw = (ctx, gameState, canvas) => {
    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    if(gameState.current == gameState.playing){
      ctx.font = "35px Teko";
      ctx.fillText(this.score, canvas.width/2, 50);
    }else if (gameState.current == gameState.gameOver){
      ctx.font = "25px Teko";
      ctx.fillText(this.score, 150, 186);
      ctx.fillText(this.highScore, 150, 228);
      ctx.strokeText("Press R or Left Click to restart", 50, 300);
      ctx.fillText("Press R or Left Click to restart", 50, 300);
    }
  }

  /** Resets the score to 0 */
  resetScore = () => {
    this.score = 0;
  }
}