/**
 * This little module helps to use the google-map API calls.
 */

const axios = require('axios');
const config = require('../../../config');

const api_url = 'https://maps.googleapis.com/maps/api';
module.exports = {
  /** 
   * Documentation: https://developers.google.com/maps/documentation/geocoding/start
   */
  getLatitudeLongitude: (address) => {
    if (!address) throw ('Address is missing!');

    let params = {
      address: address,
      key: config.googleMaps.apiKey
    }
    return axios.get(`${api_url}/geocode/json?`, params)
  }
}