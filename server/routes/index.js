/**
 * This file contains the routes of the server side.
 */
const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config');


router.post('/getOpportunityMarkers', (req, res) => {
  // Randomly generated example data for representing it.
  let markers = []
  for (let i = 0; i < 99; i++) {
    markers.push({
      longitude: Math.floor(Math.random() * 200),
      latitude: Math.floor(Math.random() * 200),
      id: i
    });
  }
  res.json(markers);
  return;

  axios.post(`${config.api.url}/Dashboards/Opportunities?max_num=-1&view_name=records`, {})
    .then(body => {
      res.json(body.data);
    }).catch(err => {
      console.log(err);
      res.send(500);
    });
});

router.post('/getLonLatByAddress', (req, res) => {
  res.json({
    longitude: 42,
    latitude: 16
  });
  return;

  let options = req.body.options;
  if (options) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?`, {
        address: `${options.country}+${options.postalcode}+${options.state}+${options.city}+${options.street}`,
        key: config.googleMaps.apiKey
      }).then((resp) => {
        res.json(resp);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      })
  }
});
module.exports = router;