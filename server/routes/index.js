/**
 * This file contains the routes of the server side.
 */
const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config');


router.post('/getOpportunities', (req, res) => {
  // Randomly generated example data for representing it.
  let opportunities = []
  for (let i = 0; i < 4; i++) {
    opportunities.push({
      id: i,
      name: 'Opportunity' + i,
      sales_status: "Status" + i,
      // TODO: The exercise contains this variable, but the database not???
      sales_stage: "Stage" + i,
      amount: Math.floor(Math.random() * i) * 100
    });
  }
  res.json(opportunities);
  return;

  axios.post(`${config.api.url}/Dashboards/Opportunities?max_num=-1&view_name=records`, {})
    .then(body => {
      res.json(body.data);
    }).catch(err => {
      console.log(err);
      res.send(500);
    });
});

// TODO: I need a Google API to be able to use this service.
router.post('/getLonLatByAddress', (req, res) => {
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

/**
 * This route calls the sugarAPI and requests the Accounts that
 * - Accounts that have a related open opportunity of 1.000 $ or more (amount >= 1000) on a map.  
 */
router.post('/getAccounts', (req, res) => {
  let name = ['Sugar', 'Apple', 'Mercedes', 'Audi', 'myCRM'];
  let accounts = [];
  for (let i = 0; i < Math.floor(Math.random() * 15) + 1; i++) {

    let opportunities = []
    for (let i = 0; i < 4; i++) {
      opportunities.push({
        id: i,
        name: 'Opportunity' + i,
        sales_status: "Status" + i,
        // TODO: The exercise contains this variable, but the database not???
        sales_stage: "Stage" + i,
        amount: Math.floor(Math.random() * 9) * 234
      });
    }

    accounts.push({
      account_id: i,
      name: name[Math.floor(Math.random() * name.length)],
      billing_address_city: 'City' + i,
      billing_address_country: 'County' + i,
      billing_address_postalcode: i,
      billing_address_state: 'State' + i,
      billing_address_street: "Street" + i,
      longitude: Math.floor(Math.random() * 60),
      latitude: Math.floor(Math.random() * 60),
      opportunities
    });
  }

  let filter_the_accounts_by_exercise = accounts.filter((account) => account.opportunities.filter((opportunity) => opportunity.amount >= 1000).length > 0);
  res.json(filter_the_accounts_by_exercise);
});
module.exports = router;