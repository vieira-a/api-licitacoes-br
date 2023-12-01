<h1 align="center">Extrator de processos licitarórios</h1>

<p align="center">Automatizando Extração de Processos e Itens Licitatórios</p>

<p align="center">Status: em desenvolvimento</p>

<p align="center">
  <a href="#Projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Recursos">Recursos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Como utilizar">Como utilizar</a>
</p>

<br>

# Projeto

O objetivo desse projeto é prover uma solução para automatizar a extração de processos e itens licitatórios do [Portal de Compras Públicas](https://www.portaldecompraspublicas.com.br/).

## Recursos

- Extração manual: provê uma rota para acionamento da funcionalidade de extração de processos e itens de processos.

- Extração Automática de processos e itens de processos: realiza extrações automáticas programadas quatro vezes ao dia, assegurando a atualização contínua dos processos dos próximos 30 dias, mantendo-os sempre atualizados e precisos.

- Gerenciamento de cache para gerenciar as solicitações mais críticas

- Personalização e Controle: possui diversos filtros que oferecem controle total sobre a pesquisa e acesso às informações necessárias.

- Documentação Abrangente: A documentação detalhada da API com Swagger garante clareza e fácil integração para futuros desenvolvimentos.

# Tecnologias

- Node.js
- Nest.js
- TypeScript
- PostgreSQL
- Redis
- Docker

# Funcionalidades

> Extração de processos da API

- Realiza buscas com URLs dinâmicas, passando por todos os processos licitatórios cadastrados.
- Gera massa de dados para persistência de acordo com parâmetro pré estabelecido: 
   - Processos com data de início dos lances inferior ou igual aos próximos 30 dias, de acordo com a data corrente;
   - Salva apenas processos novos

> Salva os dados de processos

- Caso o processo já esteja cadastrado, o sistema verifica se há atualizações dos itens do respectivo processo

> Exclui processos antigos

- Exclui processos e itens relacionados aos processos que possuem data de início dos lances superior a 30 dias, de acordo com a data corrente

> Extração de itens de processos da API

- Realiza buscas com URLs dinâmicas, compostas pelos códigos dos processos, passando por todos os itens de processos licitatórios cadastrados.

- Gera massa de dados para persistência de acordo com parâmetro pré estabelecido: 

> Salva os dados de itens de processos

- Salva apenas itens novos

> Transformação de dados

- Utilização de `mappers` e `DTOs` para adequar os dados extraídos de acordo com as entidades pré estabelecidas

> Tratamento de erros

- Lida com erros de forma apropriada, evitando encerramento inesperado e mau funcionamento

> Execução automática dos serviços

- Utiliza a biblioteca `@nestjs/schedule` para agendar execução automática dos serviços extração de dados da API e persistência em banco de dados

> Pesquisa de dados

- Possui rotas para visualização de processos
- Possui rotas para visualização de itens processos
- Todas as rotas suportam paginação e retornos padronizados, de forma a facilitar a utilização da API

> Gerenciamento de cache

- Utiliza as bibliotecas `@nestjs/cache-manager`, `cache-manager` e `cache-manager-redis-yet` juntamente com o Redis para gerenciar o cache das principais das rotas de solicitações

> Documentação

- Utiliza a biblioteca `@nestjs/swagger` para criar uma documentação concisa e auto explicativa

> Organização do projeto

- Organiza arquivos do projeto por módulos, que contém suas respectivas funcionalidades
- Organiza recursos compartilhados em diretórios separados, buscando facilitar a identificação dos recursos

> Arquitetura do projeto

- Utiliza os princípios arquiteturais oferecidos pelo Nest.js, fazendo uso apropriado de `Decorators`, `Dependency injection`, `Repositories`, juntamente com princípios de SOLID.

# Como utilizar

**1. Requisitos**

Certifique-se de possuir os itens abaixo instalados:

- [Node.js](https://nodejs.org/en/download)
- [NPM](https://docs.npmjs.com/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com)

**2. Clone este repositório**

`git clone git@github.com:vieira-a/api-licitacoes-br.git`

**3. Configure variáveis de ambiente**

- Crie um arquivo `.env` na raiz do projeto de acordo com o arquivo `.env.example`:

```
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_ADMIN_EMAIL=
```
Esses dados serão utilizados para criar o container do banco de dados **PostgreSQL** e da interface de gerenciamento do banco de dados, o **pgAdmin**

**4. Crie e execute os containers necessários**

`docker-compose up -d`

**5. Instale as dependências do projeto**

`npm install`

**6. Realize a migração dos modelos de dados**

`npm run migration:generate -- db/migrations/create-database-tables`

Este comando criará um arquivo com as configurações das migrações que serão realizadas no diretório `db/migrations`

**7. Execute as migrações**

`npm run migration:run`

**8. Inicialize a aplicação**

`npm run start:dev`

**9. Acesso**

- API: http://localhost:3000/api/v2
- Documentação: http://localhost:3000/api/v2/docs
