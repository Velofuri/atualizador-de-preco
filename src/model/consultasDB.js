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

consultaTabelaProducts();
