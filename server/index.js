const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const config = require('../config');

/** No 'Access-Control-Allow-Origin' header is present on the requested resource error */
app.use(cors({
  origin: `http://localhost:${config.client.port}`,
  credentials: true
}));

app.listen(config.server.port, (req, res) => {
  console.log(`Server is listening on ${config.server.port} port`)
});