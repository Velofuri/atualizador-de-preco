import { Td, Th } from '../Table/Table'

export default function ProductList({ listaProdutos }) {
  return (
    <>
      <h2 className='text-2xl font-bold mb-3 text-center'>Lista de Produtos</h2>
      <div className='flex justify-center'>
        <table>
          <thead>
            <tr>
              <Th>Código</Th>
              <Th>Nome</Th>
              <Th>Preço</Th>
              <Th>Novo Preço</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {listaProdutos.map((produto) => (
              <tr key={produto.code}>
                <Td>{produto.code}</Td>
                <Td>{produto.name}</Td>
                <Td>R$ {produto.sales_price}</Td>
                <Td>R$ {produto.new_price}</Td>
                <Td>
                  <ul>
                    {produto.status.map((status, index) => (
                      <li key={index}>{status.message}</li>
                    ))}
                  </ul>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
