# FSO Phonebook

This Phonebook app is built on MERN-stack using Typescript front and back.

The app can be accessed at https://fso-2021-phonebook.herokuapp.com/

## Setup dev env

See README's in [client](client/README.md) and [server](server/README.md).

## Heroku deployment instructions

1. Create new app in Heroku.

2. Setup _Config Vars_ in Heroku via App -> Settings -> Config Vars

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
BUILD_PATH=../server/public
GENERATE_SOURCEMAP=false
INLINE_RUNTIME_CHUNK=false
REACT_APP_API_END_POINT=<production_path>/api
```

3. As this app is hosted in a subdirectory of a multi-app repo, this app must be deployed to Heroku as a Git subtree.

```
# Login to Heroku CLI from the command line
$ heroku login

# Add Heroku remote
$ heroku git:remote -a <app-name-in-heroku>

# Make sure everything is committed
$ git add .
$ git commit -m "Final commit"

# Push only this app from the repo to Heroku
$ git subtree push --prefix part3/phonebook-continued heroku main
```

### Heroku process

When app is deployed to Heroku, Heroku runs the root folder's `yarn run build` which builds react app into server/public -directory and transpiles the backend into server/build.

Heroku starts the app from running the root folder's `yarn run start` which starts the transpiled app from the server/build/index.js.

The backend uses the /server/public as the server's public folder.
