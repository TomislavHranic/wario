import Player from "./player.js";
import InputHandler from "./input.js";

export default class Game {
  constructor( width, height ) {
    this.width = width;
    this.height = height;
    this.player = new Player( this );
    this.input = new InputHandler();
  }

  update() {
    this.player.update( this.input.keys );
  }

  draw( ctx ) {
    this.player.draw( ctx );
  }
}
