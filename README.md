<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Repo for technical assignment

## Installation

```bash
$ npm install
```

## Before running the app in dev mode

1. Rename .env.copy to .env to get the needed environment variables, if you find one missing or its a sensetive data, please send a mail to jesusadrian1953.1@gmail.com

2. Run the database container ready using:

```bash
$ docker compose up -d
```

3. Execute database migrations running

```bash
$ npm run migration:run
```
## Running the app

```bash
# development
$ npm run start

# dev
$ npm run dev

# production mode
$ npm run start:prod
```

Check the swagger on http://localhost:3000/api

## Generating migrations

A.  Generate new migration
 ```bash
$ npm run migration:generate db/migrations/<yourmigrationname>
``` 
Please take into consideration that if you mispell the migration name, then the migration wont be executed unless you modify the migration script
Example:
```bash
$ npm run migration:generate db/migrations/CreateUserTable
``` 

B. Apply all migrations

Example:
```bash
$ npm run migration:run
``` 

C. Revert last migration
```bash
$ npm run migration:revert
``` 


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```