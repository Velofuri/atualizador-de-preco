export function verificaSeCodigoProdutoExiste(produtosArquivoUpload, produtosBD) {
  const produtoNaoEncontrados = produtosArquivoUpload.filter((produtoUpload) => {
    return !produtosBD.some(
      (produtoDB) => produtoDB.code === parseInt(produtoUpload.product_code)
    );
  });

  if (produtoNaoEncontrados.length > 0) {
    console.log('Códigos não encontrados:', produtoNaoEncontrados);
    return { valido: false, produtoNaoEncontrados };
  } else {
    console.log('Todos os codigos são válidos');
    return { valido: true };
  }
}

export function verificaNovoPreco(produtosArquivoUpload, produtosBD) {
  const produtosComPrecoInvalido = [];

  produtosArquivoUpload.forEach((produtoUpload) => {
    const produtoCorrespondente = produtosBD.find((produto) => {
      return produto.code === parseInt(produtoUpload.product_code);
    });

    if (produtoCorrespondente) {
      const novoPreco = parseFloat(produtoUpload.new_price);
      const precoCusto = parseFloat(produtoCorrespondente.cost_price);
      const precoVenda = parseFloat(produtoCorrespondente.sales_price);

      if (novoPreco < precoCusto) {
        produtosComPrecoInvalido.push({
          codigo: produtoUpload.product_code,
          nome: produtoCorrespondente.name,
          motivo: 'Novo preço menor que o preço de custo',
        });
      }

      const variacaoPercentual = Math.abs((novoPreco - precoVenda) / precoVenda) * 100;
      if (variacaoPercentual > 10) {
        produtosComPrecoInvalido.push({
          codigo: produtoUpload.product_code,
          nome: produtoCorrespondente.name,
          motivo: 'Variação do novo preço maior que 10% do preço de venda',
        });
      }
    }
  });

  if (produtosComPrecoInvalido.length === 0) {
    return { valido: true };
  } else {
    console.log('produtos com novo preço inválido', produtosComPrecoInvalido);
    return { valido: false, produtosComPrecoInvalido };
  }
}
