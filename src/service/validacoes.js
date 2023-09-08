import { verificaSeHePacote } from '../model/consultasDB.js';

export function verificaCodigoEPreco(produtoUpload, produtosBD) {
  const codigoExiste = produtosBD.some(
    (produtoDB) => produtoDB.code === parseInt(produtoUpload.product_code)
  );
  if (codigoExiste) {
    const novoPreco = verificaNovoPreco(produtoUpload, produtosBD);
    if (novoPreco.valido) {
      return { valido: true, message: 'ok' };
    } else {
      return novoPreco;
    }
  } else {
    return {
      valido: false,
      message: `O código ${produtoUpload.product_code} não esta cadastrado`,
    };
  }
}

export async function validandoPacote(produto, produtosUpload) {
  const codigoProduto = parseInt(produto.product_code);
  const hePacote = await verificaSeHePacote(codigoProduto);

  if (hePacote.valido) {
    const idProdutosDoPacote = hePacote.rows.map((row) => {
      return row.product_id;
    });
    const idProdutosUpload = produtosUpload.map((row) => {
      return parseInt(row.product_code);
    });
    let idProdutoExiste = true;
    for (const id of idProdutosDoPacote) {
      idProdutoExiste = idProdutoExiste && idProdutosUpload.includes(id);
    }
    if (!idProdutoExiste) {
      return {
        ativo: false,
        message: `Atualize os produtos do pacote ${codigoProduto}`,
      };
    } else {
      return { ativo: true, message: 'ok' };
    }
  }
}

export function verificaNovoPreco(produtosArquivoUpload, produtosBD) {
  const produtosComPrecoInvalido = [];

  const produtoCorrespondente = produtosBD.find((produto) => {
    return produto.code === parseInt(produtosArquivoUpload.product_code);
  });

  if (produtoCorrespondente) {
    const novoPreco = parseFloat(produtosArquivoUpload.new_price);
    const precoCusto = parseFloat(produtoCorrespondente.cost_price);
    const precoVenda = parseFloat(produtoCorrespondente.sales_price);

    if (novoPreco < precoCusto) {
      produtosComPrecoInvalido.push({
        valido: false,
        message: 'Novo preço menor que o preço de custo',
      });
    }

    const variacaoPercentual = Math.abs((novoPreco - precoVenda) / precoVenda) * 100;
    if (variacaoPercentual > 10) {
      produtosComPrecoInvalido.push({
        valido: false,
        message: 'Variação do novo preço maior que 10% do preço de venda',
      });
    }
  }

  if (produtosComPrecoInvalido.length === 0) {
    return { valido: true, message: 'ok' };
  } else {
    return produtosComPrecoInvalido;
  }
}
