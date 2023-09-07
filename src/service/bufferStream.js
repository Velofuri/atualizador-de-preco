import csvParser from 'csv-parser';
import { Readable } from 'stream';

export async function bufferStream(buffer) {
  const result = [];

  const streamBuffer = new Readable();
  streamBuffer.push(buffer);
  streamBuffer.push(null);

  streamBuffer.pipe(csvParser({ delimiter: ',' })).on('data', (data) => {
    if (!data.product_code || !data.new_price) {
      console.log('Registro inválido');
    } else {
      result.push(data);
    }
  });
  // .on('end', () => {
  //   console.log('Buffer complete');
  // });
  return result;
}
