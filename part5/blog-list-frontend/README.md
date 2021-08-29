# FSO Bloglist React Frontend

## Setup dev

```
cd client
yarn install
```

Setup minimal .env

- Make sure the backend port in REACT_APP_API_END_POINT is correct for the backend API, default is 3131
- REACT_APP_API_TEST_END_POINT is used for the isolated Cypress-environment

```
REACT_APP_API_END_POINT=http://localhost:3131/api
REACT_APP_API_TEST_END_POINT=http://localhost:3133/api

```

### Run dev

```
yarn run dev
```

- starts app to http://localhost:3132

## Other commands

```
yarn run lint
- eslint

yarn run test
- Jest tests

yarn run test:cypress:ui
- Spins up separated environments for backend and frontend and opens the Cypress UI

yarn run test:cypress:headless
- Spins up separated environments for backend and frontend and opens the Cypress in headless mode (command line)

yarn run build
- production build

yarn run start
- start the production app
```
