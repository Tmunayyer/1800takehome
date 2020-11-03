import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { entrySagaCreators, setSearch } from './store/entry/entry'

import { Screen, Entry, Input } from './components'

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

function SearchBar() {
  const entryStore = useSelector((state) => state.entryStore)
  const dispatch = useDispatch()

  return (
    <Input
      icon={'search'}
      value={entryStore.search}
      onChangeHandler={(e) => {
        dispatch(setSearch(e.target.value))
      }}
    />
  )
}

function App() {
  return (
    <Screen>
      <SearchBar />
      <EntryList />
    </Screen>
  )
}

export default App
