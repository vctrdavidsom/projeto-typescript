# NestJS CRUD Application

Este é um aplicativo CRUD desenvolvido com NestJS para gerenciar produtos e categorias. Ele fornece uma API RESTful para realizar operações como criar, recuperar, atualizar e excluir produtos e categorias.

## Features

- **Gerenciamento de Produtos**: Criar, listar, buscar, atualizar e remover produtos.
- **Gerenciamento de Categorias**: Criar, listar, buscar, atualizar e remover categorias.
- **DTOs**: Objetos de Transferência de Dados para validação e transferência de dados.
- **Entidades**: Estrutura dos modelos de dados de produtos e categorias.

## Pré-requisitos

Certifique-se de que você tenha as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) (geralmente incluído com o Node.js)
- [SQLite](https://www.sqlite.org/) (opcional, o banco de dados será criado automaticamente)

## Installation

1. **Clone o repositório:**
   ```bash
   git clone <git@github.com:vctrdavidsom/Projeto-typescript.git>
   ```

2. Navegue até o diretório do projeto::
   ```
   cd Projeto-typescript/nestjs-crud-app-2
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Configuração
O projeto já está configurado para usar o SQLite como banco de dados. O arquivo database.sqlite será criado automaticamente na raiz do projeto ao iniciar o servidor.

Se desejar alterar a configuração do banco de dados, edite o arquivo src/app.module.ts na seção TypeOrmModule.forRoot.

## Running the Application

1. Inicie o servidor:
```
npm run start
```
O aplicativo será executado em `http://localhost:3000`.

2. Interaja com o CLI (opcional): O projeto inclui um CLI para gerenciar produtos e categorias. Para iniciar o CLI, abra outro terminal e execute:
```
npm run cli
```
O CLI permite criar, listar, buscar, atualizar e remover produtos e categorias diretamente pelo terminal.

## Testando a API

1. Use o arquivo routes.http: O arquivo routes.http contém exemplos de requisições para testar a API. Abra o arquivo no VS Code e use a extensão REST Client para enviar requisições.

2. Categorias:
   - POST /categories: Criar uma nova categoria
   - GET /categories: Listar todas as categorias
   - GET /categories/:name: Buscar uma categoria pelo nome
   - PUT /categories/:name: Atualizar uma categoria pelo nome
   - DELETE /categories/:name: Remover uma categoria pelo nome
Produtos:
   - POST /products: Criar um novo produto
   - GET /products: Listar todos os produtos
   - GET /products/:name: Buscar um produto pelo nome
   - PUT /products/:name: Atualizar um produto pelo nome
   - DELETE /products/:name: Remover um produto pelo nome

## Testes
Para executar os testes end-to-end, use o seguinte comando:
```
npm run test:e2e
```

## API Documentation

API routes são definidas no arquivo `routes.http`. Você pode usar a extensão REST Client no seu editor de código para testar os endpoints da API.


## License

Este projeto está licenciado sob a licença [MIT](/LICENSE).