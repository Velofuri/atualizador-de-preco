import {
  validaSeProdutoPertencePacote,
  validandoPacote,
  verificaCodigoEPreco,
} from './validacoes.js';

export async function respostaFront(produtosUpload, produtosDoBD) {
  const respostaFront = [];
  try {
    for (const produto of produtosUpload) {
      const produtoAtual = produtosDoBD.find((produtoBD) => {
        return produtoBD.code === parseInt(produto.product_code);
      });

      const statusAtualizado = [];

      const codigoExiste = verificaCodigoEPreco(produto, produtosDoBD);
      statusAtualizado.push({
        valido: codigoExiste[0].valido,
        message: codigoExiste[0].message,
      });

      const pacotesInvalidos = await validandoPacote(produto, produtosUpload);
      if (pacotesInvalidos) {
        statusAtualizado.push({
          valido: pacotesInvalidos.valido,
          message: pacotesInvalidos.message,
        });
      }

      const produtosPertencePacote = await validaSeProdutoPertencePacote(
        produto,
        produtosUpload
      );
      if (produtosPertencePacote) {
        statusAtualizado.push({
          valido: produtosPertencePacote.valido,
          message: produtosPertencePacote.message,
        });
      }

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
  } catch (error) {
    console.error(error);
  }
}
