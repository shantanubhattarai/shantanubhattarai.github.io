//separate all constants into a constants file so it can be accessed by all modules
import DrawableObject from './drawableObject.js';
import Background from './background.js';
import Bird from './bird.js';
import PipeManager from './pipeManager.js';
import ScoreManager from './scoreManager.js';

/** Main game loop
 * @param container id of canvas object to draw in
*/
export default function Main(container){
  let self = this;
  /** Spritesheet for all sprites */
  const sprite = new Image();
  sprite.src = "img/sprite.png";

  /** Canvas and its context */
  const canvas = document.getElementById(container);
  const ctx = canvas.getContext('2d');

  this.frames = 0;

  /**Declares game state */
  const gameState = {
    'current': 0,
    'getReady': 0,
    'playing': 1,
    'gameOver' : 2
  }

  /** Handles Mouse click event on different game states*/
  canvas.addEventListener('mousedown', function(e){
    if(gameState.current == gameState.getReady){
      gameState.current = gameState.playing;
      getReadyImage.active = false;
      newBird.active = true;
      gameOverImage.active = false;
    }else if(gameState.current == gameState.playing){
      newBird.flap();
    }else if (gameState.current == gameState.gameOver){
      gameState.current = gameState.getReady;
      newBird.resetSpeed();
      pipeManager.reset();
      scoreManager.resetScore();
      gameOverImage.active = false;
      newBird.active = false;
      getReadyImage.active = true;
    }
  });

  /** Handles keyboard events on different game states  */
  canvas.addEventListener('keyup', function(e){
    if (e.keyCode == 82 && gameState.current == gameState.gameOver){
      gameState.current = gameState.getReady;
      newBird.resetSpeed();
      pipeManager.reset();
      scoreManager.resetScore();
      gameOverImage.active = false;
      newBird.active = false;
      getReadyImage.active = true;
    }
    if(e.key == ' ' && gameState.current == gameState.playing){
      newBird.flap();
    }
    if(e.key == ' ' && gameState.current == gameState.getReady){
      gameState.current = gameState.playing;
      getReadyImage.active = false;
      newBird.active = true;
      gameOverImage.active = false;
    }
  });

  /** Instantiating all key game objects */
  let newBird = new Bird(276, 112, 34, 26, 50, 150, 12);
  let background = new Background(0, 0, 275, 226, 0, canvas.height - 226, 0.1);
  let backgroundTopLayer = new Background(276, 0, 224, 112, 0, canvas.height - 112, 2);
  let getReadyImage = new DrawableObject(0, 228, 173, 152, canvas.width/2 - 173/2, 200);
  let gameOverImage = new DrawableObject(175, 228, 225, 160, canvas.width/2 - 225/2, 90);
  let pipeManager = new PipeManager(2, 100, -150);
  let scoreManager = new ScoreManager();

  /** Calls draw function for all game objects and draws background */
  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle="#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx, sprite,gameState);
    backgroundTopLayer.draw(ctx, sprite);
    pipeManager.draw(ctx, sprite);
    newBird.draw(ctx, sprite);
    getReadyImage.draw(ctx, sprite);
    gameOverImage.draw(ctx, sprite);
    scoreManager.draw(ctx, gameState, canvas);
  }

  /** Calls update function on all game objects */
  function update(){
    newBird.update(canvas, backgroundTopLayer, self);
    background.update(gameState);
    backgroundTopLayer.update(gameState);
    pipeManager.update(canvas, gameState, newBird, scoreManager, self);
  }

  /** Main loop */
  function loop(){
    update();
    draw();
    self.frames++;
    window.requestAnimationFrame(loop);
  }

  /** Game Over function */
  this. gameOver = function(){
    if(gameState.current == gameState.playing) {
      gameState.current = gameState.gameOver;
      gameOverImage.active = true;
    }
  }

  /** Set gameready state on start */
  function init(){
    getReadyImage.active = true;
  }

  init();
  loop();
}

/**Add new canvas in index.html and create new instances here */
window.addEventListener('load', function(){
  let mainGame = new Main('main-canvas');
})

