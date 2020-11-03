import { all } from 'redux-saga/effects'
import API from '../../api/api'

import { entrySagas } from '../entry/entry'

/**
 * Sagas are defined in their respective store module to allow
 * easier access to synchronous action creators.
 */
const sagas = [...entrySagas]

export default function* rootSaga() {
  // set up environemtn
  const api = new API('http://localhost:3001')

  const environment = {
    api,
  }

  yield all(sagas.map((s) => s(environment)))
}
