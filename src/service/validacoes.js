import { verificaSeHePacote, verificaSeProdutoPertenceAPacote } from '../model/consultasDB.js';

export function verificaCodigoEPreco(produtoUpload, produtosBD) {
  const codigoExiste = produtosBD.some(
    (produtoDB) => produtoDB.code === parseInt(produtoUpload.product_code)
  );
  if (codigoExiste) {
    const novoPreco = verificaNovoPreco(produtoUpload, produtosBD);
    if (novoPreco.valido) {
      return [{ valido: true, message: 'ok' }];
    } else {
      return novoPreco;
    }
  } else {
    return [
      {
        valido: false,
        message: `O código ${produtoUpload.product_code} não esta cadastrado`,
      },
    ];
  }
}

export async function validandoPacote(produto, produtosUpload) {
  try {
    const codigoProduto = parseInt(produto.product_code);
    const hePacote = await verificaSeHePacote(codigoProduto);

    if (hePacote.valido) {
      const quantidadeProdutoPacote = hePacote.rows[0].qty;
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
        const precoDoPacote = parseFloat(produto.new_price);
        const produtosCorrespondentes = produtosUpload.filter((prod) =>
          idProdutosDoPacote.includes(parseInt(prod.product_code))
        );

        const somaPrecoProdutosCorrespondentes = produtosCorrespondentes.reduce((acc, valor) => {
          const valorNumerico = parseFloat(valor.new_price);
          return acc + valorNumerico * quantidadeProdutoPacote;
        }, 0);

        const somaPrecoProdutosCorrespondentesArredondado = Number(
          somaPrecoProdutosCorrespondentes.toFixed(2)
        );

        if (precoDoPacote === somaPrecoProdutosCorrespondentesArredondado) {
          return { valido: true, message: 'ok' };
        } else {
          return {
            valido: false,
            message: 'valor do pacote diferente da soma do valor dos produtos',
          };
        }
      }
    }
    return;
  } catch (error) {
    console.error(error);
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

    if (novoPreco < precoCusto || !novoPreco) {
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

export async function validaSeProdutoPertencePacote(produto, produtosUpload) {
  const codigoProduto = parseInt(produto.product_code);
  const pertenceAPacote = await verificaSeProdutoPertenceAPacote(codigoProduto);

  if (pertenceAPacote.valido) {
    const idDoPacote = pertenceAPacote.rows.map((row) => {
      return row.pack_id;
    });
    const idProdutosUpload = produtosUpload.map((row) => {
      return parseInt(row.product_code);
    });
    let idPacoteExiste = true;
    for (const id of idDoPacote) {
      idPacoteExiste = idPacoteExiste && idProdutosUpload.includes(id);
    }
    if (!idPacoteExiste) {
      return { valido: false, message: `Atualize o pacote ${idDoPacote}` };
    }
  }
  return;
}
