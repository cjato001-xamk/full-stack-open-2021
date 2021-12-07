# FSO Library Backend

## Setup dev

```
cd server
yarn install
```

Setup minimal .env

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net
MONGODB_DB_NAME=fso-2021-library
JWT_SECRET=fgsdFG#€T
```

### Run dev

```
yarn run dev
```

- starts nodemon
- using the default setup, you can access
  http://localhost:4000/graphql

## Other commands

```
yarn run start
```
