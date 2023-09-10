export const pulse = ( freq, vol = 1, cycleMode = 2 ) => {
  const sampleDeltaTime = 1 / ( freq * 8 )        // delta time between samples 1second / ( frequency * 8samples)
  return {
    freq: freq,
    sampleDeltaTime: sampleDeltaTime,
    samples: getCycle( cycleMode, vol ),
  }
}

function getCycle( cycleMode, vol ) {
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
      break;
  }
}
