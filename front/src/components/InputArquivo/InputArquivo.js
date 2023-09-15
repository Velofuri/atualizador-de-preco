import './InputArquivo.css';
import Botao from '../Botao/Botao';
import { useState } from 'react';

function InputArquivo({ required, accept, setListaProdutos }) {
  const [arquivoCsv, setArquivoCsv] = useState();

  function handleFile(e) {
    const file = e.target.files[0];
    setArquivoCsv(file);
  }

  const validarProdutos = async () => {
    try {
      if (arquivoCsv) {
        const formData = new FormData()
        formData.append('csvFile', arquivoCsv)
  
        const response = await fetch('http://localhost:3001/upload', {
          method: 'POST',
          body: formData,
        })
  
        if (response.ok) {
          const data = await response.json()
          setListaProdutos(data)
        } else {
          console.log('Erro ao enviar o arquivo')
        }
      } else {
        alert('Selecione um arquivo')
      }
    } catch (error) {
      console.error('Falha no envio do arquivo', error)
    }    
  };

  return (
    <div className='input-arquivo'>
      <input onChange={handleFile} type='file' required={required} accept={accept} />
      <Botao onClick={validarProdutos}>Validar</Botao>
    </div>
  );
}

export default InputArquivo;
