export default function ScoreManager(){
  this.score = 0;

  this.setScore = function(scoreInc){
    this.score += scoreInc;
  }

}