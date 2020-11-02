const db = require('./db')

const { randomNumber, randomString } = require('../util')

describe("the 'database'", () => {
  test('loads the data', () => {
    db.initialize()
    expect(db.entries).toHaveLength(100)
  })

  test('method: initialize', () => {
    db.initialize()
    expect(db.entries).toHaveLength(100)

    // run test 100 times
    for (let i = 0; i < 100; i++) {
      // pick random title
      const index = randomNumber(100)
      const randomEntry = db.entries[index]

      // make sure title is in the map and has index pointers
      const selected = db.mapOfTitles[randomEntry.title]

      expect(selected).toBeDefined()
      expect(selected.length).toBeGreaterThan(0)

      // ensure the index pointers point to correct entry
      const firstIndexWithTitle = selected[0]
      const picked = db.entries[firstIndexWithTitle]
      expect(picked.title).toBe(randomEntry.title)
    }
  })

  test('method: getEntriesByTitle', () => {
    db.initialize()
    expect(db.entries).toHaveLength(100)

    for (let i = 0; i < 100; i++) {
      const index = randomNumber()

      let title = db.entries[index].title
      let isBadTitle = false
      // sometimes, give it a bad string
      if (index % 2 === 0) {
        isBadTitle = true
        title = randomString(10)
      }

      const result = db.getEntryByTitle(title)
      if (isBadTitle) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(result).toHaveLength(0)
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(result.length).toBeGreaterThan(0)
      }
    }
  })
})
