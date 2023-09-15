import './ListaProdutos.css';

function ListaProdutos({ listaProdutos }) {
  return (
    <div className='lista-produtos'>
      <h2>Lista de Produtos</h2>
      <table>
        <thead>
          <tr>
            <th>codigo do Produto</th>
            <th>nome do Produto</th>
            <th>Preço do Produto</th>
            <th>Novo Preço do Produto</th>
            <th>Status do Produto</th>
          </tr>
        </thead>
        <tbody>
          {listaProdutos.map((produto) => (
            <tr key={produto.code}>
              <td>{produto.code}</td>
              <td>{produto.name}</td>
              <td>R$ {produto.sales_price}</td>
              <td>R$ {produto.new_price}</td>
              <td>
                <ul>
                  {produto.status.map((status, index) => (
                    <li key={index}>{status.message}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaProdutos;
