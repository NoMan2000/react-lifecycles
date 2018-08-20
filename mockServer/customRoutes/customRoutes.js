const graphqlRoutes = require('./graphql');
const jsonServer = require('json-server');
const server = jsonServer.create();
server.use(graphqlRoutes);
module.exports = server;
