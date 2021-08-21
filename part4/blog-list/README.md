# FSO BlogList Backend

## Setup dev

```
yarn install
```

Setup minimal .env

```
PORT=3001
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

### Run dev

```
yarn run dev
```

- starts nodemon
- using the default setup, you can access the /blogs-route at
  http://localhost:3001/api/blogs

## Other commands

```
yarn run lint
- eslint

yarn run test
- Jest tests

yarn run build
- production build

yarn run start
- start the production app
```
