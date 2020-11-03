import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { entrySagaCreators } from './store/entry/entry'

import { Screen, Entry } from './components'

function EntryList() {
  const entryStore = useSelector((state) => state.entryStore)
  const dispatch = useDispatch()

  useEffect(() => {
    const action = entrySagaCreators.fetchEntries()
    dispatch(action)
  }, [dispatch])

  if (entryStore.entries.status !== 'loaded') return null

  return entryStore.entries.data.map((data, index) => (
    <Entry key={data.id} data={data} index={index} />
  ))
}

function App() {
  return (
    <Screen>
      <EntryList />
    </Screen>
  )
}

export default App
