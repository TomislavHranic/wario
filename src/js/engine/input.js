export default class InputHandler {
  constructor() {
    this.keys = [];

    window.addEventListener( 'keydown', e => {
      if ( this.keys.indexOf( e.code ) === -1 ) this.keys.push( e.code );
    });

    window.addEventListener( 'keyup', e => {
      this.keys.splice( this.keys.indexOf( e.code ), 1 );
    });
  }
}
