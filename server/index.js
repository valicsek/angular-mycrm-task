const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const config = require('../config');

app.use('*', routes);

app.listen(config.server.port, (req, res) => {
  console.log(`Server is listening on ${config.server.port} port`)
});