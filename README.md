# Trybe Futebol Clube 🚀

Bem-vindo à versão aprimorada do projeto Trybe Futebol Clube! Este projeto envolve o desenvolvimento de um back-end dockerizado, utilizando modelagem de dados através do Sequelize. O projeto base foi desenvolvido pela Trybe (Escola de Desenvolvimento Web), e este README destaca os aprimoramentos feitos por mim.

## 🛠 Modificações

Os seguintes [arquivos foram modificados](MODIFIED_FILES.md) ou criados para estender a funcionalidade do projeto original Trybe Futebol Clube:

- Configurações Docker: `Dockerfile`, `docker-compose.yml`
- Aprimoramentos no back-end: Atualizações do pacote Node.js, Definições TypeScript, Extensões de interface para partidas, times e usuários, Novos modelos e migrações do Sequelize, Controladores, serviços, validações e utilitários adicionais

## 🙏 Agradecimentos

Este projeto é construído sobre o trabalho fundamental fornecido pela Trybe. A estrutura inicial, incluindo a configuração do banco de dados e uma parte da lógica do back-end, foi desenvolvida pela Trybe como parte de seu currículo de Desenvolvimento Web.

## 🖥 Tecnologias Utilizadas

- [Express](https://expressjs.com/pt-br/);
- [Sequelize](https://sequelize.org/);
- [Node](https://nodejs.org/docs/latest/api/);
- [Docker](https://docs.docker.com/)
- [Jest](https://jestjs.io/docs/getting-started)
- [ESlint](https://eslint.org/docs/latest/)

<div align="center">
  <a href="https://expressjs.com/pt-br/">
    <img height="100" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"/>
    &nbsp;&nbsp;&nbsp;
  </a>
  <a href="https://sequelize.org/">
    <img height="100" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sequelize/sequelize-original.svg"/>
    &nbsp;&nbsp;&nbsp;
  </a>
  <a href="https://nodejs.org/docs/latest/api/">
    <img height="100" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg"/>
    &nbsp;&nbsp;&nbsp;
  </a>
    <a href="https://docs.docker.com/">
    <img height="100" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"/>
    &nbsp;&nbsp;&nbsp;
  </a>
  </a>
    <a href="https://jestjs.io/docs/getting-started">
    <img height="100" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg"/>
    &nbsp;&nbsp;&nbsp;
  </a>
  </a>
    <a href="https://eslint.org/docs/latest/">
    <img height="100" width="100" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original-wordmark.svg"/>
    &nbsp;&nbsp;&nbsp;
  </a>
  
</div>

## 🚀 Como Começar

### Executando o Projeto com Docker

```sh
$ docker-compose up -d
```

Este comando constrói e inicia os contêineres. Acesse a aplicação conforme configurado, geralmente em `localhost:3000`.

### Executando o Projeto sem Docker

Certifique-se de que o Node.js e o MySQL estão instalados no seu sistema, depois:

1. Navegue até o diretório `app/backend`.
2. Instale as dependências:
   ```sh
   $ npm install
   ```
3. Configure seu banco de dados MySQL conforme os requisitos do projeto.
4. Inicie a aplicação:
   ```sh
   $ npm start
   ```

## 📚 Estrutura do Projeto

- **Banco de dados**: Utiliza MySQL, gerenciado através do Docker e Sequelize.
- **Back-end**: Node.js e Express com aprimoramentos para funcionalidade.
- **Front-end**: Interage com o back-end conforme projetado pela Trybe.

Este resumo destaca as áreas de foco para revisão e compreensão das melhorias aplicadas ao projeto.
