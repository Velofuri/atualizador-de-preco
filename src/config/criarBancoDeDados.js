import mysql from 'mysql2';
import 'dotenv/config';

const connection = mysql.createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
});

function criarBancoDeDados() {
  connection.query('CREATE DATABASE IF NOT EXISTS shopper', (error) => {
    if (error) {
      console.error('Erro ao criar o banco de dados ', error.message);
    } else {
      console.log('Banco de dados criado com sucesso!');
      criarTabelas();
    }
  });
}

function criarTabelas() {
  connection.query(`USE shopper;`, (error) => {
    if (error) {
      console.error('Erro ao selecionar o banco de dados: ', error.message);
      connection.end();
    } else {
      criarTabelaProducts();
    }
  });
}

function criarTabelaProducts() {
  connection.query(
    `CREATE TABLE IF NOT EXISTS products (
      code bigint PRIMARY KEY,
      name varchar(100) NOT NULL,
      cost_price decimal(9,2) NOT NULL,
      sales_price decimal(9,2) NOT NULL
    );`,
    (error) => {
      if (error) {
        console.error('Erro ao criar a tabela "products":', error.message);
        connection.end();
      } else {
        inserirDadosEmProducts();
      }
    }
  );
}

function inserirDadosEmProducts() {
  connection.query(
    `INSERT INTO products VALUES
    (16,'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML',18.44,20.49),
    (18,'BEBIDA ENERGÉTICA VIBE 2L',8.09,8.99),
    (19,'ENERGÉTICO  RED BULL ENERGY DRINK 250ML',6.56,7.29),
    (20,'ENERGÉTICO RED BULL ENERGY DRINK 355ML',9.71,10.79),
    (21,'BEBIDA ENERGÉTICA RED BULL RED EDITION 250ML',10.71,11.71),
    (22,'ENERGÉTICO  RED BULL ENERGY DRINK SEM AÇÚCAR 250ML',6.74,7.49),
    (23,'ÁGUA MINERAL BONAFONT SEM GÁS 1,5L',2.15,2.39),
    (24,'FILME DE PVC WYDA 28CMX15M',3.59,3.99),
    (26,'ROLO DE PAPEL ALUMÍNIO WYDA 30CMX7,5M',5.21,5.79),
    (1000,'BEBIDA ENERGÉTICA VIBE 2L - 6 UNIDADES',48.54,53.94),
    (1010,'KIT ROLO DE ALUMINIO + FILME PVC WYDA',8.80,9.78),
    (1020,'SUPER PACK RED BULL VARIADOS - 6 UNIDADES',51.81,57.00);`,
    (error) => {
      if (error) {
        console.error('Erro ao inserir dados na tabela "products":', error.message);
      } else {
        criarTabelaPacks();
      }
    }
  );
}

function criarTabelaPacks() {
  connection.query(
    `CREATE TABLE IF NOT EXISTS packs (
      id bigint AUTO_INCREMENT PRIMARY KEY,
      pack_id bigint NOT NULL,
      product_id bigint NOT NULL,
      qty bigint NOT NULL,
      CONSTRAINT FOREIGN KEY (pack_id) REFERENCES products(code),
      CONSTRAINT FOREIGN KEY (product_id) REFERENCES products(code)
    );`,
    (error) => {
      if (error) {
        console.error('Erro ao criar a tabela "packs":', error.message);
      } else {
        inserirDadosEmPacks();
      }
      connection.end();
    }
  );
}

function inserirDadosEmPacks() {
  connection.query(
    `INSERT INTO packs (pack_id, product_id, qty) VALUES
    (1000,18,6),
    (1010,24,1),
    (1010,26,1),
    (1020,19,3),
    (1020,21,3);`,
    (error) => {
      if (error) {
        console.error('Erro ao inserir dados na tabela "packs":', error.message);
      } else {
        console.log('Tabelas e dados criados com sucesso!');
      }
    }
  );
}

connection.connect((error) => {
  if (error) {
    console.error('Falha na conexão', error.message);
  } else {
    console.log('conecxão estabelecida com sucesso!');
    criarBancoDeDados();
  }
});
