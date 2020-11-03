import { createSlice } from '@reduxjs/toolkit'
import { put, take } from 'redux-saga/effects'
import sagaFactory from '../saga/sagaFactory'

const initialState = {
  entries: { data: [], status: 'loading' },
  search: '',
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
  },
})

export const { setEntries, setSearch } = entrySlice.actions
export default entrySlice.reducer

export const [entrySagas, entrySagaCreators] = sagaFactory({
  fetchEntries: function* fetchEntries({ api }) {
    while (true) {
      yield take('fetchEntries')
      const response = yield api.get('/v1/all')

      yield put(setEntries(response))
    }
  },
})
