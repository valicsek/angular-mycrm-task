const express = require('express');
const app = express();
const path = require('path');

app.listen('1995', (req, res) => {
  console.log('Server is listening on 1995 port')
});