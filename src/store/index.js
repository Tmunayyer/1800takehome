import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import entryStoreReducer from './entry/entry'
import sagas from './saga'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
  entryStore: entryStoreReducer,
})

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

const rootSaga = sagas(store)
sagaMiddleware.run(rootSaga)

export default store
