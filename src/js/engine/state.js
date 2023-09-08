export const states = {
  STANDING_LEFT: 0,
  STANDING_RIGHT: 1,
  CROUCHING_LEFT: 2,
  CROUCHING_RIGHT: 3,
  JUMP_LEFT: 4,
  JUMP_RIGHT: 5,
  FALLING_LEFT: 6,
  FALLING_RIGHT: 7,
  CRAWLING_LEFT: 8,
  CRAWLING_RIGHT: 9,
  RUNNING_LEFT: 10,
  RUNNING_RIGHT: 11,
}

class State {
  constructor( state ) {
    this.state = state;
    this.frameCounter = 0;
    this.animationFrame =  0;
  }

  enter() {
    this.frameCounter = 0;
    this.player.left = this.left();
    this.player.stateSpriteData = this.setup();
  }

  setup() {
    return this.player.character.normal.standing;
  }

  update() {
    if ( this.frameCounter >= this.player.stateSpriteData.framesPerSprite[ this.animationFrame ] ) {
      this.animate();
      this.frameCounter = 0;
    }

    this.frameCounter++;
  }

  left() {
    return false;
  }

  animate() {
    if ( this.animationFrame >= this.player.stateSpriteData.animation.length - 1 ) {
      this.animationFrame = 0;
    } else {
      this.animationFrame++;
    }
  }

  handleInput( inputKeys ) {
  }
}

export class StandingRight extends State {
  constructor( player ) {
    super( 'Standing' );
    this.player = player;
  }

  animate() {
    if ( this.player.stateSpriteData.name === 'blink' && Math.floor( Math.random() * 100 ) <= 30 ) {
      this.player.stateSpriteData = this.player.character.normal.standing;
    } else if ( Math.floor( Math.random() * 1000 ) <= 30 ) {
      this.player.stateSpriteData = this.player.character.normal.blink;
    }
  }

  handleInput( inputKeys ) {
    if ( inputKeys.includes( 'ArrowRight' ) ) this.player.setState( states.RUNNING_RIGHT );
    if ( inputKeys.includes( 'ArrowLeft' ) ) this.player.setState( states.STANDING_LEFT );
    if ( inputKeys.includes( 'ArrowDown' ) ) this.player.setState( states.CROUCHING_RIGHT );
    if ( inputKeys.includes( 'Space' ) ) this.player.setState( states.JUMP_RIGHT );
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
    if ( inputKeys.includes( 'ArrowLeft' ) ) this.player.setState( states.RUNNING_LEFT );
    if ( inputKeys.includes( 'ArrowRight' ) ) this.player.setState( states.STANDING_RIGHT );
    if ( inputKeys.includes( 'ArrowDown' ) ) this.player.setState( states.CROUCHING_LEFT );
    if ( inputKeys.includes( 'Space' ) ) this.player.setState( states.JUMP_LEFT );
  }
}

export class CrouchingRight extends State {
  constructor( player ) {
    super( 'Crouching' );
    this.player = player;
  }

  setup() {
    return this.player.character.normal.crouching;
  }

  animate() {
  }

  handleInput( inputKeys ) {
    if ( inputKeys.includes( 'ArrowLeft' ) ) {
      this.player.setState( states.CROUCHING_LEFT );
    } else if ( inputKeys.includes( 'ArrowRight' ) ) {
      this.player.setState( states.CRAWLING_RIGHT );
    }

    if ( ! inputKeys.includes( 'ArrowDown' ) ) this.player.setState( states.STANDING_RIGHT );
  }
}
export class CrouchingLeft extends CrouchingRight {
  constructor( player ) {
    super( player );
  }

  left() {
    return true;
  }

  handleInput( inputKeys ) {
    if ( inputKeys.includes( 'ArrowRight' ) ) {
      this.player.setState( states.CROUCHING_RIGHT );
    } else if ( inputKeys.includes( 'ArrowLeft' ) ) {
      this.player.setState( states.CRAWLING_LEFT );
    }

    if ( ! inputKeys.includes( 'ArrowDown' ) ) this.player.setState( states.STANDING_LEFT );
  }
}

export class CrawlingRight extends State {
  constructor( player ) {
    super( 'Crawling' );
    this.player = player;
  }

  setup() {
    this.player.maxXSpeed = 1;

    return this.player.character.normal.crouching;
  }

  handleInput( inputKeys ) {
    if ( ! inputKeys.includes( 'ArrowRight' ) ) this.player.setState( states.CROUCHING_RIGHT );
    if ( ! inputKeys.includes( 'ArrowDown' ) ) this.player.setState( states.STANDING_RIGHT );
  }
}

export class CrawlingLeft extends CrawlingRight {
  constructor( player ) {
    super( player );
  }

  left() {
    return true;
  }

  handleInput( inputKeys ) {
    if ( ! inputKeys.includes( 'ArrowLeft' ) ) this.player.setState( states.CROUCHING_LEFT );
    if ( ! inputKeys.includes( 'ArrowDown' ) ) this.player.setState( states.STANDING_LEFT );
  }
}


export class JumpingRight extends State {
  constructor( player ) {
    super( 'Jumping' );
    this.player = player;
  }

  setup() {
    this.player.ySpeed = - this.player.jumpSpeed;

    return this.player.character.normal.jumping;
  }

  animate() {
    if ( this.player.ySpeed === 0 ) {
      if ( this.player.left ) {
        this.player.setState( states.FALLING_LEFT );
      } else this.player.setState( states.FALLING_RIGHT );
    }
  }
}

export class JumpingLeft extends JumpingRight {
  constructor( player ) {
    super( player );
  }

  left() {
    return true;
  }
}

export class FallingRight extends State {
  constructor( player ) {
    super( 'Falling' );
    this.player = player;
  }

  setup() {
    return this.player.character.normal.jumping;
  }

  animate() {
    if ( this.player.ySpeed === 0 ) {
      if ( this.player.left ) {
        this.player.setState( states.STANDING_LEFT );
      } else this.player.setState( states.STANDING_RIGHT );
    }
  }

  handleInput( inputKeys ) {
    if ( inputKeys.includes( 'ArrowLeft' ) ) {
      this.player.setState( states.FALLING_LEFT );
    }
  }
}

export class FallingLeft extends FallingRight {
  constructor( player ) {
    super( player );
  }

  left() {
    return true;
  }

  handleInput( inputKeys ) {
    if ( inputKeys.includes( 'ArrowRight' ) ) {
      this.player.setState( states.FALLING_RIGHT );
    }
  }
}

export class RunningRight extends State {
  constructor( player ) {
    super( 'Running' );
    this.player = player;
  }

  setup() {
    return this.player.character.normal.running;
  }

  handleInput( inputKeys ) {
    if ( this.player.ySpeed > 0 ) this.player.setState( states.FALLING_RIGHT );
    if ( ! inputKeys.includes( 'ArrowRight' ) ) this.player.setState( states.STANDING_RIGHT );
    if ( inputKeys.includes( 'Space' ) ) this.player.setState( states.JUMP_RIGHT );
  }
}

export class RunningLeft extends RunningRight {
  constructor( player ) {
    super( player );
  }

  left() {
    return true;
  }

  handleInput( inputKeys ) {
    if ( this.player.ySpeed > 0 ) this.player.setState( states.FALLING_LEFT );
    if ( ! inputKeys.includes( 'ArrowLeft' ) ) this.player.setState( states.STANDING_LEFT );
    if ( inputKeys.includes( 'Space' ) ) this.player.setState( states.JUMP_LEFT );
  }
}
