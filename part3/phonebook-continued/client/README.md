# FSO Phonebook React Frontend

## Setup dev

```
cd client
yarn install
```

Setup minimal .env

- First three params are needed for build only
- Make sure the backend port in REACT_APP_API_END_POINT is correct for the backend API, default is 3001

```
BUILD_PATH=../server/public
GENERATE_SOURCEMAP=false
INLINE_RUNTIME_CHUNK=false
REACT_APP_API_END_POINT=http://localhost:3001/api
```

### Run dev

```
yarn start
```
