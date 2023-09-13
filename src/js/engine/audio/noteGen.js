import { LinkedList, ListNode } from "../linkedList.js";

export const pulse = ( vol = 1, cycleMode = 2 ) => {
  const val = 1 * vol;
  let v1 = -val;
  let v2 = -val;
  let v3 = -val;
  let v4 = -val;
  let v5 = -val;
  let v6 = -val;
  let v7 = -val;
  let v8 = val;

  switch ( cycleMode ) {
    case 0:
      break
    case 1:
      v7 = val;
      break;
    case 2:
      v7 = val;
      v6 = val;
      v5 = val;
      break;
    case 3:
      v7 = val;
      v6 = val;
      v5 = val;
      v4 = val;
      v3 = val;
      break;
    default:
      v8 = 0;
      v7 = 0;
      v6 = 0;
      v5 = 0;
      v4 = 0;
      v3 = 0;
      v2 = 0;
      v1 = 0;
      break;
  }

  const waveform = new LinkedList();

  waveform.addFirst(v8);
  waveform.addFirst(v7);
  waveform.addFirst(v6);
  waveform.addFirst(v5);
  waveform.addFirst(v4);
  waveform.addFirst(v3);
  waveform.addFirst(v2);
  waveform.addFirst(v1);
  waveform.loopList();

  return waveform;
}

export const note = ( aCtx, freq, duration, p, bend = 0 ) => {
  if ( bend ) {
    bend = - bend / 1000;
  }

  const sampleRate = aCtx.sampleRate;
  console.log(aCtx.sampleRate);
  const bufferLength = Math.floor( duration * sampleRate );
  let sampleRateToFreqRatio = sampleRate / ( freq * 8 ); // freq * 8 bits per pulse
  const buffer = aCtx.createBuffer( 1, bufferLength, sampleRate );
  const channel = buffer.getChannelData(0);
  let pulseSample = p.head;
  let nextSample = sampleRateToFreqRatio;

  for (let i = 0; i < bufferLength; i++ ) {
    channel[i] = pulseSample.value;

    if ( i >= nextSample ) {
      sampleRateToFreqRatio += bend;
      nextSample += sampleRateToFreqRatio;
      pulseSample = pulseSample.next
    }
  }

  return buffer;
}
