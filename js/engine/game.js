import Player from "./player.js";
import InputHandler from "./input.js";
import { Level } from "./levels.js";

export default class Game {
  constructor( width, height ) {
    this.width = width;
    this.height = height;
    this.gravity = 1;
    this.player = new Player( this );
    this.input = new InputHandler();
    this.level = new Level( this );
  }

  update() {
    this.player.update( this.input.keys );
  }

  draw( ctx ) {
    this.level.draw( ctx );
    this.player.draw( ctx );
  }
}
