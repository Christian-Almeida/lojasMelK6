# Lojas Mel - K6

Projeto engloba, API e Testes em K6...

API faz um Crud completo utilizando REST.

Os Testes em k6 feitos em k6 são: Smoke, Spike e Stress

## Pré-Requisitos:

### API:
    - Node.js
    - MongoDB
    - Express

### K6:
    - Grafana K6

## Tipos de Metódos:

- [ ] GET: Utilizado para pegar todas as informações do BD
- [ ] POST: Utlizado para inserir no BD
- [ ] DELETE: Utilizado para apagar algo ou item do BD
- [ ] PUT: Utlizado para atualizar um item ou obejto no BD

## MongoDB:

Necessário para criação e persistência dos dados, crie uma conta no site: [https://account.mongodb.com/account/login]

> Criar o arquivo .env tem os dados do mongodb (necessário ao menos o usuário criar uma tabela)
>
> Escolher o *MONGO_URI* e a *PORTA*

## Instalação e Uso:

> Copie o código na branch api (Fork), abra na pasta API

`npm install`

> Na pasta API, o comando abaixo liga a API, onde a mesma pode ser testada no Postman ou Insomia

`yarn dev`

> Abra outra guia do Terminal ou Console, Crie a pasta *test* e crie os seus primeiros com k6

`k6 run <nome_arquivo>`
