import Game from "./engine/game.js";
import { wario } from "./characters/wario.js";
import { drawSprite } from "./engine/draw.js";

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d', { willReadFrequently: true } );

canvas.height = 240;
canvas.width = Math.floor(240*16/9);

const game = new Game( canvas.width, canvas.height );
const fps = 25;

setInterval( gameUpdate, 1000 / fps);

function gameUpdate() {
  game.update();
}

function animate() {
  ctx.clearRect( 0, 0, canvas.width, canvas.height );
  game.draw( ctx );

  requestAnimationFrame(animate);
}

animate();
