import { createSlice } from '@reduxjs/toolkit'
import { put, take, debounce } from 'redux-saga/effects'
import sagaFactory from '../saga/sagaFactory'

const initialState = {
  entries: { data: [], status: 'loading' },
  search: '',
  searchResults: { data: [], term: '' },
  editEntry: { id: -1, userId: -1, title: '', body: '' },
}

const entrySlice = createSlice({
  name: 'entryStore',
  initialState,
  reducers: {
    setEntries(state, action) {
      state.entries = { data: action.payload, status: 'loaded' }
    },
    setSearch(state, action) {
      state.search = action.payload
    },
    setSearchResults(state, action) {
      const { results, term } = action.payload
      state.searchResults = {
        data: results,
        term: term,
      }
    },
    setEditEntry(state, action) {
      if (action.payload === null) {
        state.editEntry = { id: -1, userId: -1, title: '', body: '' }
        return
      }

      const [entry] = state.entries.data.filter(({ id }) => {
        return id === action.payload
      })
      state.editEntry = { ...entry }
    },
    editEntryField(state, action) {
      const { name, value } = action.payload
      state.editEntry = {
        ...state.editEntry,
        [name]: value,
      }
    },
    saveEditEntry(state, action) {
      const lookupId = state.editEntry.id
      const index = state.entries.data.findIndex((entry) => {
        return entry.id === lookupId
      })
      state.entries.data[index] = state.editEntry
    },
  },
})

export const {
  setEntries,
  setSearch,
  setSearchResults,
  setEditEntry,
  editEntryField,
  saveEditEntry,
} = entrySlice.actions
export default entrySlice.reducer

export const [entrySagas, entrySagaCreators] = sagaFactory({
  fetchEntries: function* fetchEntries({ api }) {
    while (true) {
      yield take('fetchEntries')
      const response = yield api.get('/v1/all')

      yield put(setEntries(response))
    }
  },

  searchEntries: function* searchEntries({ store }) {
    yield debounce(500, 'searchEntries', function* (action) {
      const { entryStore } = store.getState()

      const rawData = entryStore.entries.data
      const term = entryStore.search

      if (term === '') return yield put(setSearchResults({ results: [], term }))

      const searchResults = rawData.reduce((acc, elem, index) => {
        if (elem.title.includes(term)) acc.push(index)
        return acc
      }, [])

      yield put(setSearchResults({ results: searchResults, term }))
    })
  },
})
