/** Manages Score */
export default function ScoreManager(){
  this.score = 0;

  /** Increase score by given amount
   * @param scoreInc score increment
   */
  this.setScore = function(scoreInc){
    this.score += scoreInc;
  }

}