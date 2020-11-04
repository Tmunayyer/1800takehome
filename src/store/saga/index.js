import { all } from 'redux-saga/effects'
import API from '../../api/api'

import { entrySagas } from '../entry/entry'

/**
 * Sagas are defined in their respective store module to allow
 * easier access to synchronous action creators.
 */
const sagas = [...entrySagas]

export default function rootSaga(store) {
  return function* () {
    // set up environemtn
    const api = new API('http://localhost:3001')

    const environment = {
      api,
      /**
       * The rootSaga will spin up AFTER the store has been created.
       * Because of this it would be nice to have a reference to make sure
       * were using the correct state.
       *
       */
      store,
    }

    yield all(sagas.map((s) => s(environment)))
  }
}
