import './Formulario.css';
import InputArquivo from '../InputArquivo/InputArquivo';
import ListaProdutos from '../ListaProdutos/ListaProdutos';
import Botao from '../Botao/Botao';
import { useState } from 'react';

function Formulario() {
  const [listaProdutos, setListaProdutos] = useState([]);

  async function atualizarProdutos() {
    try {
      const statusValidos = listaProdutos.every((produto) => {
        return produto.status.every((status) => status.valido === true);
      });
      if (statusValidos) {
        const response = await fetch('http://localhost:3001/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(listaProdutos),
        });
        if (response.ok) {
          alert('Produtos atualizados com sucesso!');
        } else {
          alert('Erro no servidor');
        }
      } else {
        alert('Verifique os status dos produtos');
      }
    } catch (error) {
      console.error('Falha na atualização dos produtos', error);
    }
  }

  return (
    <section className='formulario'>
      <h2>Atualizador de preços</h2>
      <div className='input-arquivo'>
        <InputArquivo required={true} accept={'.csv'} setListaProdutos={setListaProdutos} />
      </div>
      <div>
        <ListaProdutos listaProdutos={listaProdutos} />
      </div>
      <div>
        <Botao onClick={atualizarProdutos}>Atualizar</Botao>
      </div>
    </section>
  );
}

export default Formulario;
