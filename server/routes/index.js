/**
 * This file contains the routes of the server side.
 */
const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config');
const google_map = require('../modules/google_map');

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
 * This route calls the mySugar Accounts parameter to get the Accounts.
 */
router.post('/getAccounts', (req, res) => {
  const authentication_header = {
    headers: {
      'OAuth-Token': req.session.access_token
    }
  };

  const filters = {
    filter: [{
      name: {
        "$not_null": "true"
      }
    }]
  }

  axios.get(`${config.server.api.url}/Accounts`, authentication_header, filters)
    .then(body => {
      let accounts = body.data.records;
      let account = accounts[0];
      let address_of_the_account = `${account.billing_address_country}+${account.billing_address_postalcode}+${account.billing_address_city},+${account.billing_address_street},+${account.billing_address_state}`;

      google_map.getLatitudeLongitude(address_of_the_account)
        .then((body) => {
          res.send(body.data);
        })
        .catch((err) => {
          // I dont have valid API for this process ...
          account.longitude = 11;
          account.latitude = 14;
          res.send(accounts);
        });


      /** The Opportunity stats of the Account */
      let opportunity_stats = {};

      axios.get(`${config.server.api.url}/Accounts/${record}/opportunity_stats`, authentication_header)
        .then(body => {
          opportunity_stats = body.data;
          res.json(opportunity_stats);
        })
    })
    .catch(err => {
      res.json(err.response.data);
    })
});
/**
 * This route returns the opportunities for a selected Account
 */
router.post('/getOpportunities', (req, res) => {
  if (!req.body.account_id) {
    res.json({
      error: "account_id missing",
      error_message: "The account id is missing!"
    });
  }

  let account_id = req.body.account_id;

  const authentication_header = {
    headers: {
      'OAuth-Token': req.session.access_token
    }
  };

  axios.get(`${config.server.api.url}/Accounts/${account_id}/link/opportunities`, authentication_header)
    .then(body => res.json(body.data.records))
    .error(err => res.json(err.response.data));
})

/**
 * This route calls the sugarAPI and requests the Accounts that
 * - Accounts that have a related open opportunity of 1.000 $ or more (amount >= 1000) on a map.  
 */
router.post('/getAccounts_OLD', (req, res) => {
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