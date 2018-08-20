const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');
const server = jsonServer.create();
const databaseFiles = require(path.join(__dirname, 'db.js'));
const database = JSON.stringify(databaseFiles());
const dbPath = path.join(__dirname, 'db.json');
fs.writeFileSync(dbPath, database);
const router = jsonServer.router(dbPath);
const otherRoutes = require(path.join(__dirname, 'routes.json'));
const middlewares = jsonServer.defaults({ bodyParser: true, logger: true });
const customRoutes = require('./customRoutes/customRoutes.js');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(dbPath);
const db = low(adapter);

server.use((req, res, next) => {
  res.db = db;
  next();
});
const port = process.env.PORT || 8080;
const delayBy = process.env.DELAY || 750;
const bodyParser = require('body-parser');

// To handle POST, PUT and PATCH you need to use a body-parser You can use the
// one used by JSON Server
server.use(jsonServer.bodyParser);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.use(customRoutes);

// Add in additional route rewrite rules
server.use(jsonServer.rewriter(otherRoutes));

server.use(router);
try {
  server.listen(port, () => {
    const listEndpoints = require('express-list-endpoints');
    const endpoints = listEndpoints(server).map(endpoint => {
      endpoint.path = `http://localhost:${port}${endpoint.path}`;
      return endpoint;
    });
    endpoints.push(otherRoutes);
    console.log(endpoints);
    console.log(`JSON Server is running on port ${port}`);
  });
} catch (err) {
  console.error('The server is already running', err);
}
module.exports = server;
