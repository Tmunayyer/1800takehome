import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import entryStore from './entry/entry'
import sagas from './saga'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
  entryStore: entryStore,
})

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagas)

export default store
