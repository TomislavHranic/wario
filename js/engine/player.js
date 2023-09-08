import { wario } from "../characters/wario.js";
import { drawSprite } from "./draw.js";
import { StandingLeft, StandingRight } from "./state.js";

export default class Player {
  constructor( game )  {
    this.game = game;
    this.character = wario;
    this.states = [ new StandingLeft( this ), new StandingRight( this ) ];
    this.currentState = this.states[1];
    this.stateSpriteData = this.character.normal.standing;
    this.x = 0;
    this.y = 10;
    this.frame = 0;
    this.left = false;
    this.xSpeed = 0;
    this.maxXSpeed = 3;
    this.ySpeed = 0;
    this.maxYSpeed = 15;
    this.jumpSpeed = 7;
    this.maxJumpSpeed = 9;
    this.lastY = 0;
    this.lastGround = this.game.height - this.character.height;
  }

  setState( state ) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }

  update( inputKeys ) {
    this.currentState.handleInput( inputKeys );
    // horizontal movement
    // if ( inputKeys.includes( 'ArrowRight' ) ) {
    //   this.left = false;
    //   this.xSpeed = this.maxXSpeed;
    // } else if ( inputKeys.includes( 'ArrowLeft' ) ) {
    //   this.left = true;
    //   this.xSpeed = - this.maxXSpeed;
    // } else this.xSpeed = 0;

    // this.x += this.xSpeed;

    // vertical movement
    if ( this.ySpeed > this.maxYSpeed) this.ySpeed = this.maxYSpeed;

    if ( inputKeys.includes( 'ArrowUp' ) && ( this.lastGround === this.y || this.lastGround === this.lastY ) && this.ySpeed > - this.maxJumpSpeed ) {
      this.ySpeed -= this.jumpSpeed;
      if ( this.ySpeed < - this.maxJumpSpeed ) this.ySpeed = - this.maxJumpSpeed;
    }

    this.lastY = this.y;


    this.y += this.ySpeed;

    this.groundLevel();

    if ( this.y < this.lastGround ) {
      this.ySpeed++;
    } else if ( this.ySpeed !== 0 ) {
      this.ySpeed = 0;
      this.y = this.lastGround;
    }
  }

  draw( ctx ) {
    drawSprite( ctx, this.stateSpriteData.frames[ this.frame ], this.x, this.y + this.stateSpriteData.topOffset, this.character.width, this.character.height, this.left );
  }

  groundLevel() {
    const groundLevels = [];

    // find level block columns
    const levelColumns = [
      Math.floor( ( this.x + 2 ) / this.game.level.blockW ),
      Math.floor( ( this.x + this.character.width / 2 ) / this.game.level.blockW ),
      Math.floor( ( this.x + this.character.width - 2 ) / this.game.level.blockW ),
    ];

    const baseGround = this.game.height - this.character.height
    // check all ground heights in these columns
    for ( let i = this.game.level.h - 1; i >= 0 ; i-- ) {
      let ground = baseGround;
      for ( let j = 0; j < levelColumns.length; j++ ) {
        if ( this.game.level.layout[i][ levelColumns[j] ] ) {
          let newGround = baseGround - ( ( this.game.level.h - i ) * this.game.level.blockH );
          if ( newGround < ground ) ground = newGround;
        }
      }
      if ( ground !== baseGround ) groundLevels.push( ground );
    }

    groundLevels.push( baseGround );

    let groundReturn = baseGround;
    groundLevels.forEach( h => {
      if ( h < groundReturn && this.lastY <= h ) groundReturn = h;
    });

    this.lastGround = groundReturn;
  }
}
