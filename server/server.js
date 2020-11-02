const express = require('express')

const routes = require('./routes/routes')

/**
 * Initialize an express server.
 *
 * Provides an interface to inject dependencies for easier testing.
 *
 * @param {object} dependencies
 */
function createServer(dependencies) {
  const { db } = dependencies
  const app = express()

  routes.forEach(({ url, method, handler }) => {
    // dependency inject on handlers
    if (method === 'GET') app.get(url, handler(db))
  })

  return app
}

module.exports = createServer
