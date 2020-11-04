const db = require('./db')

describe("the 'database'", () => {
  test('loads the data', () => {
    db.initialize()
    expect(db.entries).toHaveLength(100)
  })
})
