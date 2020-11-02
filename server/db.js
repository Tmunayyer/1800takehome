const fs = require('fs')

// const entry = {
//   // userId: number
//   // id: number
//   // title: string
//   // body: string
// }

const db = {
  entries: [], // entry[]
  mapOfTitles: {
    // title: entry[]
  },
}

/**
 * Reads the data.json file.
 */
db.initialize = function () {
  const data = fs.readFileSync('./server/data.json')
  const arr = JSON.parse(data.toString())

  // store some references in a map for easy lookup
  arr.forEach(({ title }, index) => {
    if (this.mapOfTitles[title] === undefined) this.mapOfTitles[title] = []
    this.mapOfTitles[title].push(index)
  })

  this.entries = arr
}

/**
 * Get all the entries.
 */
db.getEntries = function () {
  return this.entries
}

/**
 * Provide the ability for users to search the JSON data by title.
 *
 * @param {string} title
 * @return {Entry}
 */
db.getEntryByTitle = function (title) {
  const lookups = this.mapOftitles[title]
  if (lookups === undefined || lookups.length === 0) return -1

  return lookups.map((index) => {
    return this.entries[index]
  })
}

// Provide the ability for the user to select an entry from the results and have it populate an edit form.
// Provide the ability for the user to type the title of an entry in the edit form and have it populate the form.
// Provide the ability for users to edit the entry and have it saved in the local Redux store. (the edited entry should be presented on subsequent searches until page reload)

module.exports = db
