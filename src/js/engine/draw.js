// Color pallete in RGBA
const palette = [
  // #00000000
  [
    0,0,0,0,
  ],
  // '#e5dab9ff',
  [
    229,218,185,255,
  ],
  // '#bebba1ff',
  [
    190,187,161,255,
  ],
  // '#738e85ff',
  [
    115,142,133,255,
  ],
  // '#2e4252ff',
  [
    46,66,82,255,
  ],
];

export const drawSprite = (ctx, pixels, x, y, w, h, left = false) => {
  let imageData = ctx.getImageData(x, y, w, h);
  let dataIndex = 0;
  if ( left ) {
    for ( let i = 0; i < h; i++ ) {
      for ( let j = w - 1; j > -1; j-- ) {
        let index = i * w + j ;
        if ( pixels[ index ] ) {
          imageData.data[dataIndex++] = palette[ pixels[ index ] ][0];
          imageData.data[dataIndex++] = palette[ pixels[ index ] ][1];
          imageData.data[dataIndex++] = palette[ pixels[ index ] ][2];
          imageData.data[dataIndex++] = palette[ pixels[ index ] ][3];
        } else {
          dataIndex += 4;
        }
      }
    }
  } else {
    for ( let i = 0; i < pixels.length; i++ ) {
      if ( pixels[i] ) {
        imageData.data[dataIndex++] = palette[ pixels[i] ][0];
        imageData.data[dataIndex++] = palette[ pixels[i] ][1];
        imageData.data[dataIndex++] = palette[ pixels[i] ][2];
        imageData.data[dataIndex++] = palette[ pixels[i] ][3];
      } else {
        dataIndex += 4;
      }
    }
  }
  ctx.putImageData(imageData, x, y, 0, 0, w, h);
}
