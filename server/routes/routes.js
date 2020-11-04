module.exports = [
  {
    url: '/v1/all',
    method: 'GET',
    handler: (db) =>
      function (req, res) {
        const entries = db.getEntries()
        res.status(200)
        res.send(entries)
      },
  },
]
