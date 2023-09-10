import { aCtx } from "./context.js";





import { pulse } from "./channels.js";

// Audio Processing Unit
let p1 = pulse(880);





export default class Sequencer {
  constructor( tune ) {
    this.tune = tune;
    this.track1 = this.tune.osc1;
    this.trackKck = this.tune.kck;
    this.totalTime = 0;
    this.aCtx = aCtx();
    this.osc1 = this.o1();
    this.gain1;
    this.kck = [];
    this.kckGain = [];
  }

  loadTune() {
    const deltaTime = 0.25 * 60.0 / this.tune.bpm;
    let nextNoteTime = this.aCtx.currentTime;







    for ( let i = 0; i < this.track1.length; i++ ) {
      this.osc1.frequency.setValueAtTime( this.track1[i][0], nextNoteTime );
      this.gain1.gain.setValueAtTime( 0, nextNoteTime );
      this.gain1.gain.linearRampToValueAtTime( 0.3, nextNoteTime + 0.001 );
      this.gain1.gain.linearRampToValueAtTime( 0, nextNoteTime + 0.15 );

      nextNoteTime += deltaTime * this.track1[i][1];
    }
    this.totalTime = nextNoteTime;

    nextNoteTime = this.aCtx.currentTime;

    this.kck = [];
    this.kckGain = [];

    for ( let i = 0; i < this.trackKck.length; i++ ) {
      this.kck[i] = this.aCtx.createOscillator();
      this.kckGain[i] = this.aCtx.createGain();
      this.kck[i].type = 'sawtooth';
      this.kck[i].connect( this.kckGain[i] );
      this.kckGain[i].connect( this.aCtx.destination )
      this.kck[i].frequency.setValueAtTime( this.trackKck[i][0], nextNoteTime );
      this.kckGain[i].gain.setValueAtTime( 0, nextNoteTime );
      this.kckGain[i].gain.linearRampToValueAtTime( 1, nextNoteTime + 0.001 );
      this.kckGain[i].gain.linearRampToValueAtTime( 0, nextNoteTime + 0.15 );
      this.kckGain[i].gain.linearRampToValueAtTime( 1, nextNoteTime + 0.30 );
      this.kckGain[i].gain.linearRampToValueAtTime( 0, nextNoteTime + 0.35 );
      this.kck[i].start( nextNoteTime );
      this.kck[i].stop( nextNoteTime + 0.35);

      nextNoteTime += deltaTime * this.trackKck[i][1];
    }
  }

  update() {
    if ( this.totalTime <= this.aCtx.currentTime ) {
      this.loadTune();
    }
  }

  o1() {
    const osc = this.aCtx.createOscillator();
    this.gain1 = this.aCtx.createGain();
    osc.type = 'square';
    osc.connect( this.gain1 );
    this.gain1.connect( this.aCtx.destination );
    osc.start();

    return osc;
  }

  o2() {
    const osc = this.aCtx.createOscillator();
    osc.type = 'square';
    //osc.connect( this.aCtx.destination );
    //osc.start();

    return osc;
  }

  resume() {
    this.aCtx.resume();

    // const bufferSource = this.aCtx.createBufferSource()
    // let buffer = this.aCtx.createBuffer(1, 5000, 44100 );
    // let channel = buffer.getChannelData(0);
    // bufferSource.buffer = buffer;
    // let times = Math.floor( 44100 / p1.freq );
    // for (let i = 0; i < 44100; i++ ) {
    //   channel[i] = p1.samples[ Math.floor(i / times) % 8 ];
    // }
    // bufferSource.connect(this.aCtx.destination);
    // bufferSource.start( 3 );

  }
}
