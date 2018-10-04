/**
 * This config file contains the necessary settings for
 * the server and for the client side as well.
 */
module.exports = {
  server: {
    port: 1995,
    api: {
      url: 'https://jsonplaceholder.typicode.com/todos/1'
    }
  },
  client: {
    port: 4200,
    url: 'http://localhost:4200',
  }
};