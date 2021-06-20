# FSO Phonebook Backend

## Setup dev

```
cd server
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

- start nodemon
- using the default setup, you can access the /persons-route at
  http://localhost:3001/api/persons

## Other commands

```
yarn run lint
- eslint

yarn run test
- run Jest tests (there ain't any working ones)

yarn run build
- make production build

yarn run start
- start the production app
```
