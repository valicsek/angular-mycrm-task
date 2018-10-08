const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const config = require('../config');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const session = require('express-session');

/**
 * Need for authenticate ourself before requesting the API Service from Sugar
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authSugar = (req, res, next) => {

  const axios_config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const requestBody = {
    "grant_type": "password",
    "client_id": "sugar",
    "client_secret": "",
    "username": config.server.api.username,
    "password": config.server.api.password,
    "platform": "custom"
  }

  // Don't request again if we have a token
  if (req.session.access_token) next();

  axios.post(`${config.server.api.url}/oauth2/token`, requestBody, axios_config)
    .then(body => {
      if (body.data.access_token) {
        req.session.access_token = body.data.access_token;
        console.log('mySugar Authentication accepted');
      }
      next();
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
};

/** I use session for storing the OAuthentication. */
app.use(session({
  secret: "dontTellToAnyone",
  resave: true,
  saveUninitialized: true
}));
/** Needed because of we want to handle the POSTs during routes */
app.use(bodyParser.json());
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