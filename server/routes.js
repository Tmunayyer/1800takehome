const db = require('./db')

module.exports = [
  {
    url: '/v1/all',
    method: 'GET',
    handler: function (req, res) {
      const data = db.getRawData()
      res.send(data)
    },
  },
]
