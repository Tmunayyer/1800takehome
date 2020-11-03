/**
 * A function for detecting general response issues and returning uniform
 * objects.
 *
 * @param {object} response
 */
export default function getGeneralProblem(response) {
  switch (response.status) {
    case 400:
      return { kind: 'user-error' }
    default:
      return null
  }
}
