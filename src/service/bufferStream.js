import csvParser from 'csv-parser';
import { Readable } from 'stream';

export async function bufferStream(buffer) {
  const result = [];

  const streamBuffer = new Readable();
  streamBuffer.push(buffer);
  streamBuffer.push(null);

  streamBuffer.pipe(csvParser({ delimiter: ',' })).on('data', (data) => {
    if (!data.product_code || !data.new_price) {
      result.push(data);
    } else {
      result.push(data);
    }
  });
  return result;
}
