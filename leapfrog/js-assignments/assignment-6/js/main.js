import Dot from './dot.js';

/** Declares Main class. Spawns dots and executes main loop */
export default class Main {
  constructor() {
    this.canvas = document.getElementById('main-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.dots = [];

    this.initY = 80;
    this.initX = 20;
    this.gap = 20;

    this.rows = 8;
    this.columns = 15;

    this.generateDots();
    this.loop();
  }

  /** Generates rows x column number of dots twice in opposite directions */
  generateDots() {
    for (let idx = 1; idx < 3; idx++){
      var currentY = this.initY;
      var currentBlueShift = 42;

      for (let i = 0; i < this.rows; i++) {
        currentY += this.gap;
        currentBlueShift += 20;

        var currentX = this.initX;
        var phaseIncrease = 10;
        var currentPhase = 0;
        var isOutofPhase = idx % 2 ? false : true;

        for (let j = 0; j < this.columns; j++) {
          var dot = new Dot(this.ctx, isOutofPhase);

          currentX += this.gap;
          dot.posX = currentX;
          dot.posY = currentY;

          currentPhase += phaseIncrease;
          dot.offsetX += currentPhase;
          dot.offsetY = currentY;

          dot.color = '#' + 'ff' + '97' + dot.toHex(currentBlueShift);

          this.dots.push(dot);
        }
      }
    }
  }

  /** Main loop. Calls draw and update on each dot */
  loop() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].draw();
      this.dots[i].update();
    }

    requestAnimationFrame(this.loop.bind(this));
  }
}

var helix = new Helix();