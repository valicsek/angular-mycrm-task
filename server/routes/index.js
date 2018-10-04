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
    res.sendStatus(500).send(err);
  });
});

/**
 * This function is the demonstration of user authentication
 */
router.post('/authenticateUser', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  res.json({
    success: username == 'demo' && password == 'demo'
  });
})

module.exports = router;