module.exports = {
  /**
   * Taken from: https://gist.github.com/6174/6062387
   *
   * Generate a random string for tests.
   *
   * @param {number} length
   */
  randomString: function (length) {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    )
  },

  /**
   * Generates a random number between 0 and parameter n.
   *
   * @param {number} n optional
   */
  randomNumber: function (n) {
    if (n === undefined) n = 10
    return Math.floor(Math.random() * n)
  },
}
