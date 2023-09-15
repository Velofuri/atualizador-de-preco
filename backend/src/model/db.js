import mysql from 'mysql2';
import 'dotenv/config';

const connection = mysql.createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
});

connection.connect((error) => {
  if (error) {
    logError(error, 'Falha na conexão com o banco de dados ');
    console.error('Falha na conexão com o banco de dados \n' + error);
  } else {
    console.log('Conetado com sucesso ao banco de dados');
  }
});

export default connection;
