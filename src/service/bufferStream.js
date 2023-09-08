import csvParser from 'csv-parser';
import { Readable } from 'stream';

export async function bufferStream(buffer) {
  const result = [];

  const streamBuffer = new Readable();
  streamBuffer.push(buffer);
  streamBuffer.push(null);

  streamBuffer.pipe(csvParser({ delimiter: ',' })).on('data', (data) => {
    if (!data.product_code || !data.new_price) {
      console.log('Verifique se todos os campos do arquivo.csv estão preenchidos', data);
      result.push(data);
    } else {
      result.push(data);
    }
  });
  return result;
}
