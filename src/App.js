import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { increment, loadEntries, counterSagaCreators } from './store/counter'
// import { useEffect } from 'react'

import { Screen } from './components'

function App() {
  const counter = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  const count = () => {
    const action = counterSagaCreators.incrementAfterSaga(2000)

    dispatch(action)
  }

  // useEffect(() => {
  //   dispatch(loadEntries())
  // }, [])

  return <Screen test123={'hello world'} />
}

export default App
