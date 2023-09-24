import { useState } from 'react'
import Button from './components/Button/Button'
import Input from './components/Input/Input'
import ProductList from './components/ProductList/ProductList'

export default function App() {
  const [arquivoCsv, setArquivoCsv] = useState()
  const [listaProdutos, setListaProdutos] = useState([])

  async function atualizarProdutos() {
    try {
      const statusValidos = listaProdutos.every((produto) => {
        return produto.status.every((status) => status.valido === true)
      })
      if (statusValidos) {
        const response = await fetch('http://localhost:3001/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(listaProdutos),
        })
        if (response.ok) {
          alert('Produtos atualizados com sucesso!')
        } else {
          alert('Erro no servidor')
        }
      } else {
        alert('Verifique os status dos produtos')
      }
    } catch (error) {
      console.error('Falha na atualização dos produtos', error)
    }
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
  }

  return (
    <section className='bg-gray-300 bg-center drop-shadow-xl my-5 mx-10 rounded-2xl p-4'>
      <h1 className='text-4xl font-bold mb-6 text-center'>Atualizador de Preços</h1>
      <div className='flex justify-evenly items-center mb-6'>
        <Input type='file' setArquivoCsv={setArquivoCsv} />
        <Button onClick={validarProdutos}>Validar</Button>
      </div>
      <div>
        <ProductList listaProdutos={listaProdutos} />
      </div>
      <div className='flex justify-center mt-10'>
        <Button onClick={atualizarProdutos}>Atualizar</Button>
      </div>
    </section>
  )
}
