const express = require('express')

const routes = require('./routes')
const db = require('./db/db')

const app = express()

// "initialize" the database
db.initialize()

routes.forEach(({ url, method, handler }) => {
  if (method === 'GET') app.get(url, handler)
})

app.listen(3001, () => console.log('listening on 3001...'))
