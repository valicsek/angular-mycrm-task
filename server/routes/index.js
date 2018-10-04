/**
 * This file contains the routes of the server side.
 */
const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config');

router.get('/', (req, res) => {
  axios.get(config.server.api.url).then(body => {
    res.json(body.data);
  }).catch(err => {
    res.send(err);
  });
});

module.exports = router;