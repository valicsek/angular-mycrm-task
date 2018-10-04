/**
 * This file contains the routes of the server side.
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(200);
});

module.exports = router;