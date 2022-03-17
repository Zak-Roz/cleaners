Create file ".env" into "node-js-jwt-auth-mongo" folder.
Input 
```
PORT=8080
NODE_ENV=test
SECRET=NULL
EMAIL_NAME=NULL@gmail.com
EMAIL_PASSWORD=NULL
```
Change EMAIL_NAME and EMAIL_PASSWORD to your own mail. (only @gmail.com)

Create file ".env" into "vue-vuex-jwt-auth" folder.
Input 
```
VUE_APP_PORT=8081
```

Open first terminal and run command
```
cd node-js-jwt-auth-mongo; npm i; npm start
```

Open second terminal and run command
```
cd vue-vuex-jwt-auth; npm i; npm run serve
```

Then open node-js-jwt-auth-mongo/server.js and comment on lines from 41 to 56 and save file (Ctrl+S).