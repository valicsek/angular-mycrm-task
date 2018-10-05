/**
 * This config file contains the necessary settings for
 * the server and for the client side as well.
 */
module.exports = {
  /** This property contains the settings of the server side */
  server: {
    /** The port of the backend side*/
    port: 1995,
    /** Api property contains the necessary information for api call */
    api: {
      /** The url of the REST API server */
      url: 'https://e7920-93.mycrmspace.de/rest/v10',
      /** The username for the oAuth Authentication */
      username: 'david',
      /** The password for oAuth Authentication */
      password: 'te)%=NP,qA-97XaDg8'
    }
  },
  /** This property contains the settings of the google maps */
  googleMaps: {
    /** The API Key for using the google's services */
    apiKey: 'AIzaSyAryi1JE6O7TDTGKOcvUM-gaYT43oUD4os'
  },
  /** This property contains the settings of the client */
  client: {
    /** The port of the client */
    port: 4200
  }
};