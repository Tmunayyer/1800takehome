module.exports = [
  {
    url: '/v1/all',
    method: 'GET',
    handler: (db) =>
      function (req, res) {
        const data = db.getEntries()
        res.send({ kind: 'ok', entries: data })
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
            kind: 'user-error',
            info: 'missing query parameter: title',
          })
          return
        }

        const data = db.getEntryByTitle(title)

        res.send({ kind: 'ok', entries: data })
      },
  },
]
