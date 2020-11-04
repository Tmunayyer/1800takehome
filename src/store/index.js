import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import entryStore from './entry/entry'
import sagas from './saga'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
  entryStore: entryStore,
})

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

const rootSaga = sagas(store)
sagaMiddleware.run(rootSaga)

export default store
