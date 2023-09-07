import { wario } from "../characters/wario.js";
import { drawSprite } from "./draw.js";

export default class Player {
  constructor( game )  {
    this.game = game;
    this.player = wario;
    this.x = 0;
    this.y = this.game.height - this.player.height;
    this.frame = 0;
    this.left = false;
    this.xSpeed = 0;
    this.maxXSpeed = 2;
    this.ySpeed = 0;
    this.maxYSpeed = 5;
    this.jumpSpeed = 12;
  }

  update( inputKeys ) {
    // horizontal movement
    if ( inputKeys.includes( 'ArrowRight' ) ) {
      this.left = false;
      this.xSpeed = this.maxXSpeed;
    } else if ( inputKeys.includes( 'ArrowLeft' ) ) {
      this.left = true;
      this.xSpeed = - this.maxXSpeed;
    } else this.xSpeed = 0;

    this.x += this.xSpeed;

    // vertical movement
    //if ( this.ySpeed > this.maxYSpeed) this.ySpeed = this.maxYSpeed;
    if ( inputKeys.includes( 'Space' ) && this.onGround() ) {
      this.ySpeed = this.jumpSpeed;
    }
    this.y -= this.ySpeed;

    if ( ! this.onGround() ) {
      this.ySpeed--;
    } else this.ySpeed = 0
  }

  draw( ctx ) {
    drawSprite( ctx, this.player.normal.crouch.frames[ this.frame ], this.x, this.y + this.player.normal.crouch.topOffset, this.player.width, this.player.height, this.left );
  }

  onGround() {
    return this.y >= this.game.height - this.player.height;
  }
}
