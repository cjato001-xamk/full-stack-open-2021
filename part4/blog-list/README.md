# FSO BlogList Backend

## Setup dev

```
yarn install
```

Setup minimal .env

```
DEVELOPMENT_PORT=3131
TEST_PORT=3133
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net
MONGODB_DB_NAME=fso-2021-blog-list
JWT_SECRET=ASdfaSD43TRE
```

### Run dev

```
yarn run dev
```

- starts nodemon
- using the default setup, you can access the /blogs-route at
  http://localhost:3131/api/blogs

## Other commands

```
yarn run lint
yarn run lint:watch
- eslint

yarn run test
yarn run test:watch
- Jest tests

yarn run build
- production build

yarn run start
- start the production app
```
