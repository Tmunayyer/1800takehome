const fs = require('fs')

const db = {
  entries: [],
}

/**
 * Reads the data.json file.
 */
db.initialize = function () {
  const data = fs.readFileSync('./server/data.json')
  const arr = JSON.parse(data.toString())

  this.entries = arr
}

/**
 * Get all the entries.
 */
db.getEntries = function () {
  return this.entries
}

module.exports = db
