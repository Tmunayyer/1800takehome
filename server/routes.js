const db = require('./db/db')

module.exports = [
  {
    url: '/v1/all',
    method: 'GET',
    handler: function (req, res) {
      const data = db.getEntries()
      res.send(data)
    },
  },
]
