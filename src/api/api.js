import getGeneralProblem from './apiProblem'

export default class API {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.headers = {
      'Content-Type': 'application/json',
    }
  }

  /**
   * Takes in an object of headers to base all requests off of.
   *
   * @param {object} options
   */
  configure(options) {
    const { headers } = options
    this.headers = headers
  }

  /**
   * Performs a get request.
   *
   * @param {string} endpoint
   */
  async get(endpoint, customHeaders, data) {
    const url = this.baseUrl + endpoint
    const stringifiedData = JSON.stringify(data)
    const options = {
      method: 'GET',
      headers: {
        ...this.headers,
        ...customHeaders,
      },
    }

    const response = await fetch(url, options, stringifiedData)
    const err = getGeneralProblem(response)

    if (err) {
      const extraInfo = await response.json()
      return { ...err, extraInfo }
    }

    return await response.json()
  }
}
