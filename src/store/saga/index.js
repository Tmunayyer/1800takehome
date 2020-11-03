import { all } from 'redux-saga/effects'

import { counterSagas } from '../counter'

/**
 * Sagas are defined in their respective store module to allow
 * easier access to synchronous action creators.
 */
const sagas = [...counterSagas]

export default function* rootSaga() {
  yield all(sagas.map((s) => s()))
}
