import { aCtx } from "./context.js";





import { pulse, note } from "./noteGen.js";




export default class Sequencer {
  constructor( tune ) {
    this.tune = tune;
    this.deltaTime = 0.25 * 60.0 / this.tune.bpm;
    this.track1 = this.tune.osc1;
    this.trackKck = this.tune.kck;
    this.totalTime = 0;
    this.aCtx = aCtx();
    this.osc1 = this.o1();
    this.gain1 = this.aCtx.createGain();
    this.kck = [];
    this.kckGain = [];
  }

  loadTune() {
    let nextNoteTime = this.aCtx.currentTime;
    const loadTime = nextNoteTime;
    let noteBufferSource = [];
    let p1 = null;
    let noteDuration = 0;
    this.gain1.connect( this.aCtx.destination );

    for ( let i = 0; i < this.track1.length; i++ ) {
      noteDuration = this.deltaTime * this.track1[i][1]
      noteBufferSource.push( this.aCtx.createBufferSource() );
      p1 = pulse();
      noteBufferSource[i].buffer = note( this.aCtx, this.track1[i][0], noteDuration, p1 )
      //this.osc1.frequency.setValueAtTime( this.track1[i][0], nextNoteTime );
      this.gain1.gain.setValueAtTime( 0, nextNoteTime );
      this.gain1.gain.linearRampToValueAtTime( 0.3, nextNoteTime + 0.001 );
      this.gain1.gain.linearRampToValueAtTime( 0, nextNoteTime + 0.15 );
      noteBufferSource[i].connect( this.gain1 );

      noteBufferSource[i].start( nextNoteTime );

      nextNoteTime += this.deltaTime * this.track1[i][1];
      console.log(noteBufferSource[i].buffer.getChannelData(0));
    }

    nextNoteTime = loadTime;

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
      this.kckGain[i].gain.linearRampToValueAtTime( 0.3, nextNoteTime + 0.001 );
      this.kckGain[i].gain.linearRampToValueAtTime( 0, nextNoteTime + 0.15 );
      this.kckGain[i].gain.linearRampToValueAtTime( 0.3, nextNoteTime + 0.30 );
      this.kckGain[i].gain.linearRampToValueAtTime( 0, nextNoteTime + 0.35 );
      this.kck[i].start( nextNoteTime );
      this.kck[i].stop( nextNoteTime + 0.35);

      nextNoteTime += this.deltaTime * this.trackKck[i][1];
    }
    this.totalTime = nextNoteTime;
  }

  update() {
    if ( this.totalTime <= this.aCtx.currentTime ) {
      this.loadTune();
    }
  }

  o1() {
    // const osc = this.aCtx.createOscillator();
    // this.gain1 = this.aCtx.createGain();
    // osc.type = 'square';
    // osc.connect( this.gain1 );
    // this.gain1.connect( this.aCtx.destination );
    // //osc.start();

    // return osc;
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
  }
}
