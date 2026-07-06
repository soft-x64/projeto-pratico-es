# TrainerX64

## Como executar o projeto

### Pré-requisitos

- Node.js
- npm
- PostgreSQL
- Git

### Execução

Clone o repositório e acesse a pasta do projeto:

```bash
git clone [URL_DO_REPOSITORIO](https://github.com/soft-x64/projeto-pratico-es.git)
cd trainerX64-mvp

Configure e execute o backend:

cd backend
npm install

Crie um arquivo .env dentro da pasta backend com:

DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/trainerx64?schema=public"

Depois execute:

npx prisma generate
npx prisma migrate dev
npm run dev

O backend será executado em http://localhost:3333.

Em outro terminal, na pasta principal do projeto, execute o frontend:

npm install
npm run dev

Acesse http://localhost:5173 no navegador.

Para encerrar o frontend ou backend, utilize Ctrl + C no terminal correspondente.
