import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { entrySagaCreators, setSearch, setEditEntry } from './store/entry/entry'

import { Screen, Entry, Input, Popup } from './components'

function EntryList() {
  const entryStore = useSelector((state) => state.entryStore)
  const dispatch = useDispatch()

  useEffect(() => {
    const action = entrySagaCreators.fetchEntries()
    dispatch(action)
  }, [dispatch])

  if (entryStore.entries.status !== 'loaded') return null

  let data = entryStore.entries.data

  const hasSearchResults = entryStore.searchResults.data.length

  if (hasSearchResults) {
    data = entryStore.searchResults.data
  }

  return data.map((data, index) => (
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
        const term = e.target.value
        dispatch(entrySagaCreators.searchEntries(term))
        dispatch(setSearch(term))
      }}
    />
  )
}

function EditEntryForm() {
  const entryStore = useSelector((state) => state.entryStore)
  const dispatch = useDispatch()

  let show = false
  if (entryStore.editEntry) show = true

  return (
    <Popup
      show={show}
      onClickOutside={() => {
        dispatch(setEditEntry(null))
      }}
    />
  )
}

function App() {
  return (
    <Screen>
      <EditEntryForm />
      <SearchBar />
      <EntryList />
    </Screen>
  )
}

export default App
