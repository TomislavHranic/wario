export class Level {
  constructor( game ) {
    this.game = game;
    this.blockH = 16;
    this.blockW = 16;
    this.h = 10; // # of blocks
    this.w = 10; // # of blocks
    this.layout = this.level1();
  }

  draw( ctx ) {
    let imageData = ctx.getImageData(0, 0, this.game.width-1, this.game.height);
    let white = true;
    imageData.data.forEach( (e,i) => {
      if ( i % 4 === 0 ) {
        white = !white;
      }

      if ( white ) imageData.data[i] = 255;
      else imageData.data[i] = 0;
    });
    ctx.putImageData(imageData, 0, 0);

    for ( let i = 0; i < this.h; i++ ) {
      for ( let j = 0; j < this.w; j++ ) {
        if ( this.layout[i][j] ) {
          ctx.fillRect( j * this.blockW, this.game.height - ( ( this.w - i ) * this.blockH ), this.blockW, this.blockH );
        }
      }
    }
  }

  level1() {
    return [
      [ 0,0,0,0,0,0,0,0,0,0 ],
      [ 0,0,0,0,0,0,0,0,0,0 ],
      [ 0,0,0,0,0,0,0,0,0,0 ],
      [ 0,0,0,0,0,0,0,0,0,0 ],
      [ 0,0,0,0,0,0,0,0,1,1 ],
      [ 0,0,0,0,0,0,0,0,0,0 ],
      [ 0,0,0,0,0,1,0,0,0,0 ],
      [ 0,0,0,0,0,1,1,0,0,0 ],
      [ 0,0,0,0,1,1,1,0,0,0 ],
      [ 0,0,0,1,1,1,1,1,0,0 ],
    ]
  }
}
