import { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

import { useSelector, useDispatch } from 'react-redux'
import { increment, loadEntries, counterSagaCreators } from './store/counter'
// import { useEffect } from 'react'

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

  return (
    <div className="App">
      <header className="App-header">
        <div onClick={count}>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>The count {counter.value}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
