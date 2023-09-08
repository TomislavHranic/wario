export const states = {
  STANDING_LEFT: 0,
  STANDING_RIGHT: 1,
}

class State {
  constructor( state ) {
    this.state = state;
  }
}

export class StandingLeft extends State {
  constructor( player ) {
    super( 'STANDING LEFT' );
    this.player = player;
  }

  enter() {
    this.player.left = true;
    this.player.stateSpriteData = this.player.character.normal.standing;
  }

  handleInput( inputKeys ) {
    if ( inputKeys.includes( 'ArrowRight' ) ) {
      this.player.setState( states.STANDING_RIGHT );
    }
  }
}

export class StandingRight extends State {
  constructor( player ) {
    super( 'STANDING RIGHT' );
    this.player = player;
  }

  enter() {
    this.player.left = false;
    this.player.stateSpriteData = this.player.character.normal.standing;
  }

  handleInput( inputKeys ) {
    if ( inputKeys.includes( 'ArrowLeft' ) ) {
      this.player.setState( states.STANDING_LEFT );
    }
  }
}
