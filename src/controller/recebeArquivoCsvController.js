import { consultaTabelaProducts } from '../model/consultasDB.js';
import { bufferStream } from '../service/bufferStream.js';
import {
  verificaNovoPreco,
  verificaSeCodigoProdutoExiste,
} from '../service/validacoes.js';

export async function recebeArquivoCsv(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo CSV foi enviado.' });
  }

  const fileBuffer = req.file.buffer;

  const produtosUpload = await bufferStream(fileBuffer);

  const produtosDoBD = await consultaTabelaProducts();

  const codigoInexistente = verificaSeCodigoProdutoExiste(produtosUpload, produtosDoBD); // retorna true ou uma lista com os codigos que não existem

  const produtoComPrecoInvalido = verificaNovoPreco(produtosUpload, produtosDoBD);

  if (codigoInexistente.valido && produtoComPrecoInvalido.valido) {
    return res.status(200).send('Validação finalizada, produtos validos');
  } else {
    res.status(400).json({
      'preco invalido': produtoComPrecoInvalido,
      'codigo inexistente': codigoInexistente,
    });
  }
}
