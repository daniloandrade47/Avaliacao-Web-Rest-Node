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