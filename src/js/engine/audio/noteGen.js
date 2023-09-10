export const pulse = ( vol = 1, cycleMode = 2 ) => {
  const val = 1 * vol;

  switch ( cycleMode ) {
    case 0:
      return [ -val, -val, -val, -val, -val, -val, -val, val ];
    case 1:
      return [ -val, -val, -val, -val, -val, -val, val, val ];
    case 2:
      return [ -val, -val, -val, -val, val, val, val, val ];
    case 3:
      return [ -val, -val, val, val, val, val, val, val ];
    default:
      return [ 0, 0, 0, 0, 0, 0, 0, 0 ];
  }
}

export const note = ( aCtx, freq, duration, p ) => {
  const sampleRate = 44100;
  const bufferLength = Math.floor( duration * sampleRate );
  const sampleRateToFreqRatio = sampleRate / ( freq * 8 ); // freq * 8 bits per pulse

  const buffer = aCtx.createBuffer( 1, bufferLength, sampleRate );
  const channel = buffer.getChannelData(0);
  for (let i = 0; i < bufferLength; i++ ) {
    channel[i] = p[ Math.floor( i / sampleRateToFreqRatio ) % 8 ];
  }

  return buffer;
}
