const createServer = require('./server')
const db = require('./db/db')

// init the "database"
db.initialize()

// inject dependencies
const dependencies = {
  db,
}

const app = createServer(dependencies)

app.listen(3001, () => console.log('listening on 3001...'))
