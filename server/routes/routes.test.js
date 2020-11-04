const request = require('supertest')
const createServer = require('../server')

class MockDB {
  methodCalledStack = []
}

MockDB.prototype.getEntries = function () {
  this.methodCalledStack.push('getEntries')

  return [{ title: 'fake entry' }]
}

describe('route: /v1/all', () => {
  const dependencies = {
    db: new MockDB(),
  }
  const url = '/v1/all'
  const app = createServer(dependencies)

  test(`GET: ${url}`, async () => {
    const mockApp = request(app)
    const response = await mockApp.get(url)
    const data = response.body

    // make sure this send some data back
    expect(data.length).toBeGreaterThan(0)
  })
})
