[![N|Solid](https://inscricoespos.unifacef.com.br/mbaesp/2018/images/logo_pos.png)]()

# Avaliação
### _Curso: Desenvolvimento de Aplicações Web Móveis Escaláveis_
### _Módulo: Web/Rest com Node_
#### _Projeto: API de um sistema simples, para vendas de produtos de piscinas._
#

Este trabalho visa a criação de uma API simples, destinada a venda de produtos para 
manuteção de piscinas. Todos os produtos cadastrados são reais, mas aqui, apenas
representam exemplos para viabilização deste projeto.

- ✨Schema de tabelas do Banco de  Dados✨
[![BD]()]()

## Tecnologias Usadas
Sistema Operacional:
- [Oracle VM VirtualBox-6.1.18-142142-Win] - Máquina Virtual
- [Linux Ubuntu 20.04.2.0-desktop-amd64] - Sistema Operacional
- [Node.js v12.22.0] - Plataforma de aplicação Back-End compilada pela máquina virtual V8
- [Yarn v1.22.0] - Gerenciador de pacotes
- [Visual Studio Code] - Editor de código fonte
- [Insomnia] - API Client para testar rotas
- [Beekeeper Studio] - Editor SQL de código aberto e um aplicativo de gerenciamento de banco de dados

## Desenvolvimento

Primeira Etapa:
- Criar o projeto no Github
- Clonar o repositório
- Dentro do projeto, criar o **package.json**
```sh
yarn init -y
```
- Instalar o pacote **express.js**
```sh
yarn add express
```
- Instalar a tipagem do express
```sh
yarn add @types/express -D
```
- Instalar o Typescript
```sh
yarn add typescript -D
```
- Criar a pasta SRC na raíz do projeto
- Dentro da pasta SRC, criar o arquivo **server.ts**, com a seguinte configuração dentro:
```sh
import express from "express";
const app = express();
app.listen(3333, () => console.log("Inf: Server is running on port 3333"))
```
- Criar o arquivo de configuração do Typescript
```sh
yarn tsc --init
```
- Editar o arquivo **tsconfig.json**
```sh
Em "strict": true, substituir por "strict": false
```
- Instalar o tradutor de typescript para o Node
```sh
yarn add ts-node-dev -D
```
- Editar o arquivo **package.json** e criar nele o seguinte script abaixo, onde solicitamos para rodar o nosso **server.ts**
```sh
"scripts": {
  "dev": "ts-node-dev src/server.ts"
},
```
- Executar o projeto, iniciando o servidor com:
```sh
yarn dev
```
- Obs: Em caso de erro, por já haver uma instância de **Node** rodando, digitar o comando **pkill node** e repetir o comando **yarn dev**

---

Segunda Etapa:
- Instalar o módulo avançado de gerenciamento de relações de objeto
```sh
yarn add typeorm --save
```
- Instalar também a biblioteca **reflect-metadata**, responsável pelas anotations
```sh
yarn add reflect-metadata --save
```
- Instalar também o tipo de database, neste caso, SQLite3 (banco em memória)
```sh
yarn add sqlite --save

Obs.: Em caso de erro:
 - Instalar NPM: npm install
 - Instalar banco: npm install sqlite3 --save
```
- Criar o arquivo **ormconfig.json** na raiz do projeto e configurá-lo, conforme dados abaixo.
```sh
{
  "Type":"sqlite"
}
```
- Criar dentro de **src** uma pasta **database** para colocar as informações de conexão
- Dentro da pasta **src/database/** criar um arquivo chamado **index.ts** e configurá-lo para criar a conexão com o banco de dados
```sh
import { createConnection } from "typeorm";

createConnection();
```
- No arquivo **server.ts**, importar o database afim de criar a conexão com o banco de dados
```sh
import "./database";
```
- Dentro da pasta **src/database/** criar uma pasta chamada **migrations**, responsável por armazenar todas as migrations criadas
- Editar o arquivo **ormconfig.json** adicionando o banco de dados e as migrations
```sh
{
  "Type":"sqlite",
  "database": "./src/database/database.sqlite",
  "migrations": ["./src/database/migrations/**.ts"]
}
```
- Editar o arquivo package.json adicionando mais um script para que o **ts-node-dev** utilize a **cli do typeorm** para criar as migrations.

```sh
"scripts": {
  "dev": "ts-node-dev src/server.ts",
  "typeorm": "ts-node-dev node_modules/typeorm/cli.js"
},
```

- Editar o arquivo **ormconfig.json** e informar nele qual é a **cli** que será executada e qual o diretório onde as migrations serão criadas
```sh
"cli": {
    "migrationsDir": "./src/database/migrations"
```
- Criar a migration *Clientes*
```sh
yarn typeorm migration:create -n CreateClientes
```
- Editar o arquivo da migration de clientes na pasta **src/database/migrations/** conforme predisposto no Schema de tabelas do Banco de  Dados, no topo deste documento

- Executar a criação da tabela
```sh
yarn typeorm migration:run

Obs.: Importante, para reverter a criação da tabela basta aplicar o comando: yarn typeorm migration:revert
```
- Conectar via BeeKeeper, o arquivo **database.sqlite** para acompanhamento da criação das tabelas e seus resultados
- Criar na pasta raiz **src/** uma pasta **entities** que armazenará as entidades (classes que representam as tabelas)
- Dentro da pasta **src/entities/** criar o arquivo **cliente.ts**
- Alterar o arquivo **tsconfig.json** descomentando as linhas:
```sh
- experimentalDecorators
- emitDecoratorMetadata
```
- Instalar a biblioteca **uuid** que é utilizada nas chaves das tabelas
```sh
yarn add uuid
```
- Instalar as tipagens da biblioteca *uuid*
```sh
yarn add @types/uuid -D
```
- Na entidade **cliente.ts** importar o *uuid* e criar o construtor para o *uuid*
- mapear o caminho das entidades no arquivo **ormconfig.json**
```sh
"entities":["./src/entities/**.ts"]
```
- Criar dentro da pasta **/src** a pasta repositories **/src/repositories**
- Criar dentro da pasta repositories o repositório de clientes **"ClientRepository.ts"** e nele criar uma classe de mesmo nome extendendo o Repository do Typeorm
- Criar na raiz da pasta **/src** o arquivo **routes.ts**, responsável por armazenar os nossos endpoints
- Alterar o arquivo **server.ts** para que importe o arquivo de routes criado, e defina que o app irá usar o json do express e o routes criado

```sh
import { routes } from "./routes";

app.use(express.json());
app.use(routes);
``` 

- Criar na raiz da pasta **/src** uma nova pasta chamada **controllers**, responsável pela classe de comunicação entre a rota e o repositório
- Criar na raiz da pasta **controllers** o arquivo **ClientesController.ts**
- Alterar o arquivo **routes.ts** para utilizar o controller criado