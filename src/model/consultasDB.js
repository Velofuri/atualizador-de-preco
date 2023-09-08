import connection from './db.js';

export async function consultaTabelaProducts() {
  try {
    const query = 'select * from products;';
    const [rows] = await connection.promise().execute(query);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function verificaSeHePacote(codigo) {
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
}
