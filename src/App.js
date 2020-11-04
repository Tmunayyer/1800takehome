import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Screen, Entry, Input, TextArea, Button } from './components'

import { Popup, PopupHeader, PopupBody, PopupActions } from './components'

import {
  entrySagaCreators,
  setSearch,
  setEditEntry,
  editEntryField,
  saveEditEntry,
} from './store/entry/entry'

function EntryList() {
  const dispatch = useDispatch()
  useEffect(() => {
    const action = entrySagaCreators.fetchEntries()
    dispatch(action)
  }, [dispatch])

  const entries = useSelector((state) => state.entryStore.entries)
  const searchResults = useSelector((state) => state.entryStore.searchResults)
  if (entries.status !== 'loaded') return null

  let data = entries.data

  const hasSearchResults = searchResults.data.length
  const searchHasNoResults = searchResults.term !== ''

  if (hasSearchResults || searchHasNoResults) {
    data = searchResults.data.map((rawDataIndex) => {
      return entries.data[rawDataIndex]
    })
  }

  return data.map((elem, index, arr) => {
    return (
      <Entry
        key={elem.id}
        data={elem}
        index={index}
        onClick={() => {
          dispatch(setEditEntry(elem.id))
        }}
      />
    )
  })
}

function SearchBar() {
  const search = useSelector((state) => state.entryStore.search)
  const dispatch = useDispatch()

  return (
    <Input
      icon={'search'}
      value={search}
      onChangeHandler={(e) => {
        const term = e.target.value
        dispatch(entrySagaCreators.searchEntries(term))
        dispatch(setSearch(term))
      }}
    />
  )
}

function EditEntryForm() {
  const editEntry = useSelector((state) => state.entryStore.editEntry)
  const dispatch = useDispatch()

  let show = false

  let title = ''
  let body = ''

  if (editEntry.id !== -1) {
    show = true
    title = editEntry.title
    body = editEntry.body
  }

  return (
    <Popup
      show={show}
      onClickOutside={() => {
        dispatch(setEditEntry(null))
      }}
    >
      <PopupHeader text={'Edit Entry'} />

      <PopupBody>
        <TextArea
          label={'Title:'}
          value={title}
          onChangeHandler={(e) => {
            dispatch(editEntryField({ name: 'title', value: e.target.value }))
          }}
        />
        <TextArea
          label={'Body:'}
          value={body}
          onChangeHandler={(e) => {
            dispatch(editEntryField({ name: 'body', value: e.target.value }))
          }}
        />
      </PopupBody>

      <PopupActions>
        <Button
          text={'cancel'}
          onClick={() => dispatch(setEditEntry(null))}
          disabled={false}
          type={'cancel'}
        />
        <Button
          text={'save'}
          onClick={() => {
            dispatch(saveEditEntry())
            dispatch(setEditEntry(null))
            dispatch(entrySagaCreators.searchEntries())
          }}
          disabled={false}
          type={'submit'}
        />
      </PopupActions>
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
