const jsonServer = require('json-server');
const db = require('./db.js')();
const myMiddlewares = require('./middlewares.js');
const server = jsonServer.create();
const router = jsonServer.router(db);
const PORT = process.env.PORT || 3000;

server.use(jsonServer.bodyParser);
server.use(myMiddlewares);
server.use(router);
server.listen(PORT, () => {
  console.log('JSON Server is running')
});