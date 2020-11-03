/**
 * Takes in an object of multiple sagas and returns their respective
 * generators and actionCreators for easy exports.
 *
 * @param {object} sagas
 */
export default function sagaFactory(sagas) {
  const generators = []
  const actionCreators = {}

  for (let name in sagas) {
    generators.push(sagas[name])
    actionCreators[name] = function (payload) {
      return { type: name, payload: payload }
    }
  }

  return [generators, actionCreators]
}
