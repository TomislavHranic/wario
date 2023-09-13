import { LinkedList } from "../linkedList.js";
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
    this.noteFadeInOut = ( 1 / this.aCtx.sampleRate ) * 50 // 5 samples of fade in and out to prevent popping
    this.osc1 = this.o1();
    this.gain1 = this.aCtx.createGain();
    this.kck = [];
    this.kckGain = [];
    this.playingSfx = [ 0, 0, 0, 0 ];
    this.track
    this.nextSixteenthNote = this.aCtx.currentTime;
    this.beatIndex = 0; // in sixteenths
    this.buffers1;
    this.buffers2;
    this.buffers3;
    this.buffers4;
    this.track1 = this.aCtx.createBufferSource();
    this.track2 = this.aCtx.createBufferSource();
    this.track3 = this.aCtx.createBufferSource();
    this.track4 = this.aCtx.createBufferSource();
  }

  setup() {
    buffers1 = new LinkedList();
    buffers2 = new LinkedList();
    buffers3 = new LinkedList();
    buffers4 = new LinkedList();
    this.track1.connect( this.aCtx.destination );
    this.track2.connect( this.aCtx.destination );
    this.track3.connect( this.aCtx.destination );
    this.track4.connect( this.aCtx.destination );
  }

  schedule() {
  }

  loadTune() {
    let thisNoteTime = this.aCtx.currentTime;
    const loadTime = thisNoteTime;
    let noteBufferSource = [];
    let p1 = null;
    let noteDuration = 0;
    this.gain1.connect( this.aCtx.destination );

    for ( let i = 0; i < this.track1.length; i++ ) {
      noteDuration = this.deltaTime * this.track1[i][1]
      noteBufferSource.push( this.aCtx.createBufferSource() );
      p1 = pulse();
      //console.log(p1);
      noteBufferSource[i].buffer = note( this.aCtx, this.track1[i][0], noteDuration, p1 )
      //this.osc1.frequency.setValueAtTime( this.track1[i][0], thisNoteTime );
      this.gain1.gain.setValueAtTime( 0, thisNoteTime );
      this.gain1.gain.linearRampToValueAtTime( 1, thisNoteTime + this.noteFadeInOut );
      this.gain1.gain.setValueAtTime( 1, thisNoteTime + noteDuration - this.noteFadeInOut );
      this.gain1.gain.linearRampToValueAtTime( 0, thisNoteTime + noteDuration );
      noteBufferSource[i].connect( this.gain1 );

      noteBufferSource[i].start( thisNoteTime );

      thisNoteTime += this.deltaTime * this.track1[i][1];
      // console.log(p1);
    }

    thisNoteTime = loadTime;

    this.kck = [];
    this.kckGain = [];

    for ( let i = 0; i < this.trackKck.length; i++ ) {
      this.kck[i] = this.aCtx.createOscillator();
      this.kckGain[i] = this.aCtx.createGain();
      this.kck[i].type = 'sawtooth';
      this.kck[i].connect( this.kckGain[i] );
      this.kckGain[i].connect( this.aCtx.destination )
      this.kck[i].frequency.setValueAtTime( this.trackKck[i][0], thisNoteTime );
      this.kckGain[i].gain.setValueAtTime( 0, thisNoteTime );
      this.kckGain[i].gain.linearRampToValueAtTime( 0.3, thisNoteTime + 0.001 );
      this.kckGain[i].gain.linearRampToValueAtTime( 0, thisNoteTime + 0.15 );
      this.kckGain[i].gain.linearRampToValueAtTime( 0.3, thisNoteTime + 0.30 );
      this.kckGain[i].gain.linearRampToValueAtTime( 0, thisNoteTime + 0.35 );
      this.kck[i].start( thisNoteTime );
      this.kck[i].stop( thisNoteTime + 0.35);

      thisNoteTime += this.deltaTime * this.trackKck[i][1];
    }
    this.totalTime = thisNoteTime;
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
