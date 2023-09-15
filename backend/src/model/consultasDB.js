import connection from './db.js';

export async function consultaTabelaProducts() {
  try {
    const query = 'select * from products;';
    const [rows] = await connection.promise().execute(query);
    return rows;
  } catch (error) {
    console.error(error);
  }
}

export async function verificaSeHePacote(codigo) {
  try {
    if (!codigo) {
      return { valido: false };
    }
    const query = `select * from products as p 
    inner join packs as pa 
    on p.code = pa.pack_id
    where p.code = ${codigo};`;

    const [rows] = await connection.promise().execute(query);
    if (rows.length === 0) {
      return { valido: false };
    } else {
      return { valido: true, rows };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function verificaSeProdutoPertenceAPacote(codigo) {
  try {
    if (!codigo) {
      return { valido: false };
    }
    const query = `select * from packs where product_id = ${codigo};`;
    const [rows] = await connection.promise().execute(query);
    if (rows.length === 0) {
      return { valido: false };
    } else {
      return { valido: true, rows };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateTabelaProdutos(dados) {
  try {
    await connection.promise().beginTransaction();
    for (const dado of dados) {
      const query = 'UPDATE products SET sales_price = ? WHERE code = ?';
      await connection.promise().execute(query, [dado.new_price, dado.code]);
    }
    await connection.promise().commit();
    console.log('Upload dos arquivos realizado com sucesso!');
    return true;
  } catch (error) {
    await connection.promise().rollback();
    console.error(error);
  }
}
