import axios from 'axios';
import { consultaTabelaProducts, verificaSeHePacote } from '../model/consultasDB.js';
import { bufferStream } from '../service/bufferStream.js';
import { respostaFront } from '../service/respostaFront.js';

export async function recebeArquivoCsv(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo CSV foi enviado.' });
    }

    const fileBuffer = req.file.buffer;

    const produtosUpload = await bufferStream(fileBuffer);

    const produtosDoBD = await consultaTabelaProducts();

    const responseFront = await respostaFront(produtosUpload, produtosDoBD);

    return res.json(responseFront);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
