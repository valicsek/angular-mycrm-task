const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const config = require('../config');
const axios = require('axios');
const cors = require('cors');

/**
 * Need for authenticate ourself before requesting the API Service from Sugar
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authSugar = (req, res, next) => {
  next();

  const axios_config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  const requestBody = {
    params: {
      grant_type: "password",
      client_id: "sugar",
      username: config.server.api.username,
      password: config.server.api.password
    }
  }

  axios.post(`${config.server.api.url}/oauth2/token`, requestBody, axios_config)
    .then(body => {
      next();
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
};

/** Without this, we are not able to use the sugar REST API */
app.use(authSugar);
/** No 'Access-Control-Allow-Origin' header is present on the requested resource error */
app.use(cors({
  origin: `http://localhost:${config.client.port}`,
  credentials: true
}));

app.use('/', routes);

app.listen(config.server.port, (req, res) => {
  console.log(`Server is listening on ${config.server.port} port`)
});