# Desafio Trybe Futebol Clube

Bem-vindo ao projeto do Trybe Futebol Clube! Este desafio envolve o desenvolvimento de um back-end dockerizado utilizando modelagem de dados através do Sequelize. Certifique-se de seguir as diretrizes abaixo para uma implementação bem-sucedida.

## Habilidades Necessárias

- **Node.js e Express**: Implementar o back-end utilizando Node.js e o framework Express.
- **MySQL e Sequelize**: Trabalhar com o banco de dados MySQL utilizando o Sequelize para criar migrations e seeders.
- **Test-Driven Development (TDD)**: Desenvolver a API utilizando TDD para garantir a robustez e confiabilidade do código.
- **Git & GitHub**: Utilizar o controle de versão Git e fazer Pull Requests no GitHub.

## Descrição

O Trybe Futebol Clube é um site informativo sobre partidas e classificações de futebol. O projeto consiste em desenvolver uma API (utilizando TDD) e integrar as aplicações.

O back-end deve ser capaz de ser consumido por um front-end já provido no projeto. A implementação deve respeitar as regras de negócio fornecidas e garantir que a API seja capaz de popular adequadamente a tabela disponível no front-end.

## Estrutura do Projeto

1. **Banco de Dados:**
   - Container Docker MySQL configurado no docker-compose como serviço `db`.
   - Responsável por fornecer dados para o serviço de backend.
   - Durante os testes, será acessado pelo Sequelize via porta `3306` do `localhost`.

2. **Back-end:**
   - Ambiente para implementações utilizando Node.js e Express.
   - Deve rodar na porta `3001`.
   - Inicialização a partir do arquivo `app/backend/src/server.ts`.
   - Todas as dependências extras devem ser listadas em `app/backend/packages.npm`.

3. **Front-end:**
   - Já concluído, sem modificações necessárias.
   - Comunica-se com o serviço de back-end através da URL `http://localhost:3001`.

