import { updateTabelaProdutos } from '../model/consultasDB.js';

export async function updateController(req, res) {
  try {
    const dados = req.body;

    const statusValidos = dados.every((produto) => {
      return produto.status.every((status) => status.valido === true);
    });

    if (statusValidos) {
      const confirma = await updateTabelaProdutos(dados);
      if (confirma) {
        res.status(200).send('Upload dos arquivos realizado com sucesso!');
      } else {
        res.status(500).send('Falha na atualização dos produtos');
      }
    } else {
      res.status(404).send('pelomenos um status não é valido');
    }
  } catch (error) {
    console.error(error);
  }
}
