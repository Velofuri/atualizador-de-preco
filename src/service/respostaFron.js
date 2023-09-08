import { validandoPacote, verificaCodigoEPreco } from './validacoes.js';

export async function respostaFront(produtosUpload, produtosDoBD) {
  const respostaFront = [];
  for (const produto of produtosUpload) {
    const produtoAtual = produtosDoBD.find((produtoBD) => {
      return produtoBD.code === parseInt(produto.product_code);
    });

    const statusAtualizado = [];

    const codigoExiste = verificaCodigoEPreco(produto, produtosDoBD);
    statusAtualizado.push(codigoExiste);
    const pacotesInvalidos = await validandoPacote(produto, produtosUpload);
    statusAtualizado.push(pacotesInvalidos);
    if (produtoAtual) {
      const objetoAtualizado = {
        code: produto.product_code,
        name: produtoAtual.name,
        cost_price: produtoAtual.cost_price,
        sales_price: produtoAtual.sales_price,
        new_price: produto.new_price,
        status: statusAtualizado,
      };
      respostaFront.push(objetoAtualizado);
    } else {
      const objetoAtualizado = {
        code: produto.product_code,
        name: null,
        cost_price: null,
        sales_price: null,
        new_price: produto.new_price,
        status: statusAtualizado,
      };
      respostaFront.push(objetoAtualizado);
    }
  }
  return respostaFront;
}
