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
