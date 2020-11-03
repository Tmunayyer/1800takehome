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
  {
    url: '/v1/search',
    method: 'GET',
    handler: (db) =>
      function (req, res) {
        const { title } = req.query

        if (!title) {
          res.status(400)
          res.send({
            info: 'missing query parameter: title',
          })
          return
        }

        const entries = db.getEntryByTitle(title)

        res.status(200)
        res.send(entries)
      },
  },
]
