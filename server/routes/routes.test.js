const request = require('supertest')
const createServer = require('../server')

class MockDB {
  methodCalledStack = []
}

MockDB.prototype.getEntries = function () {
  this.methodCalledStack.push('getEntries')

  return [{ title: 'fake entry' }]
}

MockDB.prototype.getEntryByTitle = function (title) {
  this.methodCalledStack.push('getEntryByTitle')

  if (title === 'validTitle') return [{ title: 'validEntry' }]
  return []
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
    expect(data.kind).toBe('ok')
    expect(data.entries.length).toBeGreaterThan(0)
  })
})

describe('route /v1/search', () => {
  const dependencies = {
    db: new MockDB(),
  }
  const url = '/v1/search'
  const app = createServer(dependencies)

  test(`GET: good/bad query`, async () => {
    const mockApp = request(app)

    let urlParameters = '?title=validTitle'
    let response = await mockApp.get(url + urlParameters)
    let data = response.body

    // make sure this sends data corresponding to url parameters
    expect(data.kind).toBe('ok')
    expect(data.entries.length).toBeGreaterThan(0)
    expect(data.entries[0].title).toBe('validEntry')

    urlParameters = '?title=invalidTitle'
    response = await mockApp.get(url + urlParameters)
    data = response.body

    // make sure we get empty array on invalid search
    expect(data.kind).toBe('ok')
    expect(Array.isArray(data.entries)).toBe(true)
    expect(data.entries.length).toBe(0)
  })

  test(`GET: missing query`, async () => {
    const mockApp = request(app)

    let response = await mockApp.get(url)
    let data = response.body

    expect(response.status).toBe(400)
    expect(data.kind).toBe('user-error')
    expect(data.info).toBeTruthy()
  })
})
