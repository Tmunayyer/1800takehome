import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Screen, Entry, Input, Popup, Button } from './components'

import {
  entrySagaCreators,
  setSearch,
  setEditEntry,
  editEntryField,
  saveEditEntry,
} from './store/entry/entry'

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

  return data.map((data, index, arr) => (
    <Entry
      key={data.id}
      data={arr[index]}
      index={index}
      onClick={() => {
        dispatch(setEditEntry(data.id))
      }}
    />
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

  let title = ''
  let body = ''

  if (entryStore.editEntry.id !== -1) {
    show = true
    title = entryStore.editEntry.title
    body = entryStore.editEntry.body
  }

  return (
    <Popup
      show={show}
      onClickOutside={() => {
        dispatch(setEditEntry(null))
      }}
    >
      <Input
        value={title}
        onChangeHandler={(e) => {
          dispatch(editEntryField({ name: 'title', value: e.target.value }))
        }}
      />
      <Input
        value={body}
        onChangeHandler={(e) => {
          dispatch(editEntryField({ name: 'body', value: e.target.value }))
        }}
      />

      <Button
        text={'save'}
        onClick={() => {
          dispatch(saveEditEntry())
          dispatch(setEditEntry(null))
        }}
        disabled={false}
        type={'greene'}
      />
      <Button
        text={'cancel'}
        onClick={() => dispatch(setEditEntry(null))}
        disabled={false}
        type={'red'}
      />
    </Popup>
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
