import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import counter from './counter'
import sagas from './saga'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
  counter: counter,
})

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagas)

export default store
