// import API from './api'
import getGeneralProblem from './apiProblem'

describe('general api problems', () => {
  ;[
    {
      name: 'status 400',
      status: 400,
      expected: { kind: 'user-error' },
    },
  ].forEach((t) => {
    // eslint-disable-next-line jest/valid-title
    test(t.name, () => {
      const err = getGeneralProblem({ status: t.status })
      expect(err.kind).toEqual(t.expected.kind)
    })
  })
})
