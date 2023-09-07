import { bufferStream } from '../service/bufferStream.js';

export async function recebeArquivoCsv(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo CSV foi enviado.' });
  }

  const fileBuffer = req.file.buffer;

  const result = await bufferStream(fileBuffer);

  res.send(result);
}
