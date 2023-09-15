# Atualizador de preços

**🚀 Este projeto foi desenvolvido para atender os requisitos de um teste tecnico**

- [Funcionalidades](#funcionalidades)
- [Configuração](#configuracao)
- [Rotas](#rotas)
- [Roadmap](#roadmap)
- [Contato](#contato)
- [Descrição do desafio](#Descrição)

## <a id="funcionalidades"></a> ✨ Funcionalidades

O Sistema possui as seguintes funcionalidades principais:

- Receber um arquivo.csv que contem codigo do produto e novo preço

- Validar as informações recebidas seguindo as regras de negocio

- Atualizar os preços dos produtos no banco de dados

## <a id="configuracao"></a>⚙️ Configuração

Siga as etapas abaixo para configurar o projeto em seu ambiente local:

1. **Clone o repositório do GitHub:**
```nodejs
git clone https://github.com/Velofuri/atualizador-de-preco.git
```

2. **acesse a pasta backend**

3. **Instale as dependências do projeto:**
```nodejs
npm install
```

4. **Configure as variáveis de ambiente:**

- Renomeie o arquivo `.env.example` para `.env`.
- Preencha as variáveis de ambiente no arquivo `.env` com as informações do seu banco MYSQL local.

5. **Execute o arquivo para criar o banco de dados:**
```nodejs
node src/config/criarBancoDeDados.js
```

6. **Execute o projeto:**
```nodejs
npm start
```

7. **acesse a pasta front**

8. **Instale as dependências do projeto:**
```nodejs
npm install
```

9. **Execute o projeto:**
```nodejs
npm start
```

10. **Utilize o arquivo.csv que esta junto do projeto para testar a aplicação**

## <a id="rotas"></a>🛣️ Rotas

A API possui as seguintes rotas disponíveis:

- **`POST localhost:3001/upload`**: Responsável por recebe o arquivo.csv e retorna as verificações realizadas
- **`PUT localhost:3001/update`**: Responsável por atualizar o banco de dados.
- Utilize o Postman para testar as Rotas caso no momento em que esteja vendo esse projeto ele ainda não possua um frontend

## <a id="roadmap"></a>🗺️ Roadmap

A seguir, estão as próximas etapas planejadas para o desenvolvimento deste projeto:

- Implementar Frontend usando React. (implementado)


## <a id="contato"></a>📧 Contato

Se você tiver alguma dúvida ou sugestão em relação a este projeto, entre em contato com velofuri@gmail.com

## <a id="Descrição"></a> Descrição do desafio

CENÁRIO

Em qualquer empresa de e-commerce é essencial que os usuários possam atualizar os preços de 
suas lojas para se manterem competitivos e manterem seus preços alinhados com os custos de 
operação. Essa tarefa parece simples, porém quando falamos de lojas com milhares de produtos, 
se torna essencial a existência de uma ferramenta que permita atualizar os produtos de forma 
massiva e com recursos adicionais para evitar erros que possam prejudicar o negócio.

Você foi encarregado de desenvolver essa ferramenta e após uma série de reuniões com as áreas 
envolvidas, os seguintes requisitos foram levantados:

1- O time Compras, responsável por definir os preços, se comprometeu em gerar um arquivo 
CSV (exemplo em anexo) contendo código do produto e o novo preço que será carregado.

2- O time Financeiro, preocupado com o faturamento, solicitou que o sistema impeça que o 
preço de venda dos produtos fique abaixo do custo deles;

3- O time de Marketing, preocupado com o impacto de reajustes nos clientes, solicitou que o 
sistema impeça qualquer reajuste maior ou menor do que 10% do preço atual do produto

4- Alguns produtos são vendidos em pacotes, ou seja, um produto que composto por um ou 
mais produtos em quantidades diferentes. 
Estabeleceu-se a regra que, ao reajustar o preço de um pacote, o mesmo arquivo deve 
conter os reajustes dos preços dos componentes do pacote de modo que o preço final da 
soma dos componentes seja igual ao preço do pacote. 

Exemplos 1 -
Imagine o produto PACK GUARANA 1L – 6 Unidades
Ele é composto por 6 unidades do produto GUARANA 1L
O preço do pack é de R$ 24,00. O preço do componente é de R$ 4,00.
Se o arquivo do time de precificação pedir um reajuste do preço do pacote para 
R$ 30,00, o mesmo arquivo deve conter o reajuste do preço do componente, no 
caso mudando o preço para R$ 5,00 (6 x 5 = 30)

Exemplos 2 -
Imaginando o produto KIT ESCOVA DE DENTE + PASTA DE DENTE, vendido a R$ 
25,00
O produto é composto por 1 unidade do produto ESCOVA DE DENTES (R$ 10,00) e 
1 unidade do produto PASTA DE DENTE (R$ 15,00). Se o preço da ESCOVA DE DENTES for 
reajustado para R$ 20,00, o arquivo também deve conter um reajuste do preço do pacote 
para R$ 35,00 (R$ 20,00 + R$ 15,00)
A ferramenta deve impedir atualizações de preço que quebrem essa regra.

REQUISITOS

Diante desse cenário, você deve construir um sistema com os seguintes requisitos:

• O sistema deve ter um back end (node.js), contendo as todas as regras definidas e um 
front-end (React.js) que será utilizado pelo usuário da ferramenta 

• Você deve escrever seu código em Javascript ou TypeScript (preferencialmente)

• O banco de dados deve ser MySQL (versão 5 ou 8)

• O sistema deve permitir que o usuário carregue o arquivo de precificação

• O sistema deve ter um botão chamado VALIDAR. 

• Ao clicar em VALIDAR, o sistema deve ler todo o arquivo e fazer as seguintes verificações:

o Todos os campos necessários existem?

o Os códigos de produtos informados existem?

o Os preços estão preenchidos e são valores numéricos validos.? 

o O arquivo respeita as regras levantadas na seção CENARIO? 

• Ao final da validação o sistema deve exibir as seguintes informações dos produtos que 
foram enviados

o Codigo, Nome, Preço Atual, Novo Preço

• Caso uma ou mais regras de validação tenham sido quebradas, o sistema também deve 
exibir ao lado de cada produto qual regra foi quebrada.

• O sistema também deve ter um botão ATUALIZAR. Que só ficará habilitado se todos os 
produtos dos arquivos estiverem validados e sem regras quebradas

• Ao clica em ATUALIZAR, o sistema deve salvar o novo preço no banco de dados e já deixar 
a tela pronta para o envio de um novo arquivo.

• O preço de custo dos pacotes também deve ser atualizado como a soma dos custos dos 
seus componentes. Os preço de custo dos produtos que não são pacotes não deve ser 
atualizado

