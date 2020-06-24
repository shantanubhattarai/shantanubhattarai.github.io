root = document.getElementById('root');

class bounceElement{
  constructor(x = 0, y = 0, h = 200, w = 200, container = document.body){
    var self = this;
    this.x = x;
    this.y = y;
    this.height = h;
    this.width = w;
    this.container = container;
    this.element = this.createElement();
  }

  createElement(){
    this.element = document.createElement('div');
    this.element.style.height = this.height + 'px';
    this.element.style.width = this.width + 'px';
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
    return this.element;
  }

  set currentClass(elementClass){
    this.element.className += elementClass;
  }

  render(){
    this.container.appendChild(this.element);
  }
}

var outsideBox1 = new bounceElement(0, 0, 300, 300, root);
outsideBox1.currentClass = 'outside-box';
outsideBox1.render();

class ball extends bounceElement{
  constructor(x, y, h = 30, w = 30, box = document.body){
    super(x,y,h,w,box);
    this.move = this.move.bind(this);
    window.requestAnimationFrame(this.move);
    this.direction = 1;
    this.speed = 3;
  }

  move(){
    this.element.style.top = this.y + 'px';
    if(this.y < 0 || this.y + this.height >= parseInt(this.container.style.height)){
      this.direction *= -1;
    }
    this.y += this.speed * this.direction;
    window.requestAnimationFrame(this.move);
  }
}

var insideBall = new ball(50,50,20,20,outsideBox1.element);
insideBall.currentClass = 'ball';
insideBall.render();

var insideBall2 = new ball(10,10,20,20,outsideBox1.element);
insideBall2.currentClass = 'ball';
insideBall2.render();

var outsideBox2 = new bounceElement(0, 0, 300, 300, root);
outsideBox2.currentClass = 'outside-box';
outsideBox2.render();

var insideBall3 = new ball(80,50,20,20,outsideBox2.element);
insideBall3.currentClass = 'ball';
insideBall3.render();

var insideBall4 = new ball(200,10,20,20,outsideBox2.element);
insideBall4.currentClass = 'ball';
insideBall4.render();