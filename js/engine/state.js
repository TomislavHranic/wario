export const states = {
  STANDING_LEFT: 0,
  STANDING_RIGHT: 1,
  CROUCHING_LEFT: 2,
  CROUCHING_RIGHT: 3,
  BLINK_RIGHT: 4,
  BLINK_LEFT: 5,
  JUMP_RIGHT: 6,
  JUMP_LEFT: 7,
}

class State {
  constructor( state ) {
    this.state = state;
    this.frameCounter = 0;
    this.nextAnimationFrame = 1;
  }

  enter() {
    this.frameCounter = 0;
    this.player.left = this.left();
    this.player.stateSpriteData = this.spriteData();
  }

  update() {
    this.frameCounter++;
    if ( this.nextAnimationFrame === this.frameCounter ) {
      this.frameCounter = 0;
      this.animate();
    }
  }

  animate() {
  }

  left() {
    return false;
  }

  spriteData() {
    return this.player.character.normal.standing;
  }
}

export class StandingRight extends State {
  constructor( player ) {
    super( 'Standing' );
    this.player = player;
  }

  animate() {
    if ( this.player.)
  }

  handleInput( inputKeys ) {
    if ( inputKeys.includes( 'ArrowLeft' ) ) {
      this.player.setState( states.STANDING_LEFT );
    }

    if ( inputKeys.includes( 'ArrowDown' ) ) {
      this.player.setState( states.CROUCHING_RIGHT );
    }
  }
}

export class StandingLeft extends StandingRight {
  constructor( player ) {
    super( player );
  }

  left() {
    return true;
  }

  handleInput( inputKeys ) {
    if ( inputKeys.includes( 'ArrowRight' ) ) {
      this.player.setState( states.STANDING_RIGHT );
    }

    if ( inputKeys.includes( 'ArrowDown' ) ) {
      this.player.setState( states.CROUCHING_LEFT );
    }
  }
}

export class CrouchingLeft extends State {
  constructor( player ) {
    super( 'Crouching Left' );
    this.player = player;
  }

  enter() {
    this.frameCounter = 0;
    this.player.left = true;
    this.player.stateSpriteData = this.player.character.normal.crouching;
  }

  handleInput( inputKeys ) {
    if ( inputKeys.includes( 'Space' ) ) {
      this.player.setState( states.STANDING_LEFT );
    }
  }
}

export class CrouchingRight extends State {
  constructor( player ) {
    super( 'Crouching Right' );
    this.player = player;
  }

  enter() {
    this.frameCounter = 0;
    this.player.left = false;
    this.player.stateSpriteData = this.player.character.normal.crouching;
  }

  handleInput( inputKeys ) {
    if ( inputKeys.includes( 'Space' ) ) {
      this.player.setState( states.STANDING_RIGHT );
    }
  }
}

export class JumpingLeft extends State {
  constructor( player ) {
    super( 'Jumping Left' );
    this.player = player;
  }

  enter() {
    this.frameCounter = 0;
    this.player.left = true;
    this.player.stateSpriteData = this.player.character.normal.crouching;
  }

  handleInput( inputKeys ) {
    if ( inputKeys.includes( 'Space' ) ) {
      this.player.setState( states.STANDING_LEFT );
    }
  }
}
