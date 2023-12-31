import Game from "./engine/game.js";
import Sequencer from "./engine/audio/sequencer.js";
import { testTune } from "./engine/audio/tunes/test.js";

const start = document.getElementById('start');
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d', { willReadFrequently: true } );

canvas.height = 240;
canvas.width = Math.floor(240*16/9);

const game = new Game( canvas.width, canvas.height );
const fps = 25;

const sequencer = new Sequencer( testTune );

sequencer.loadTune();

start.addEventListener( 'click', () => {
  start.style.display = 'none';
  sequencer.resume();
  function drawStatus( ctx, inputKeys ) {
    ctx.font = '10px Helvetica';
    ctx.fillText( 'Inputs: ' + inputKeys, 10, 15 );
    ctx.fillText( 'State: ' + game.player.currentState.state, 10, 27 );
  }

  setInterval( timing, 1000 / fps);

  function timing() {
    game.update();
  }

  function animate() {
    sequencer.update();
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    game.draw( ctx );
    drawStatus( ctx, game.input.keys );

    requestAnimationFrame(animate);
  }

  animate();
});
