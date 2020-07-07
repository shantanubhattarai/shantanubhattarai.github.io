class Factory extends Building{
  constructor(tileX, tileY){
    super(tileX, tileY);
    this.color = 'neutral';
    this.colorTiles = {
      'neutral' : 501,
      'red': 491,
      'blue': 513,
      'green': 491,
      'orange': 491
    };
  }
}