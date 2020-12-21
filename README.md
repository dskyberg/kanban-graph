# kanban-graph
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Sandbox app to play with GraphQL, Apollo Client and React.
This client SPA leverages the Apollo Server in [apollo-koa-graphql](https://github.com/dskyberg/apollo-koa-graphql)

The app also leverages my demo of [oidc-provider](https://github.com/dskyberg/oidc-server) for authentication.

Download this repo and install the dependencies
````bash
$ git clone https://github.com/dskyberg/kanban-graph.git
...
$ cd kanban-graph
$ npm i
````
### Create a .env file
Open a file in the root apollo-koa-graphql folder called `.env` and add the following.
Then change what you want.  Be sure the redirectUri values match what is registered
in your OIDC server.

````code
REACT_APP_GRAPHQL_URI=http://localhost:9000/graphql
REACT_APP_AUTHORITY=http://localhost:3082
#REACT_APP_AUTHORITY=http://localhost:8080/auth/realms/myrealm
REACT_APP_CLIENT_ID=test_app
REACT_APP_REDIRECT_URI=http://localhost:3000/callback
````

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

