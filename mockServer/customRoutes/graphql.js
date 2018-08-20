const jsonServer = require('json-server');
const server = jsonServer.create();

server.get('/', (req, res) => {
  res.send('Hello There');
  res.end();
});

module.exports = server;
