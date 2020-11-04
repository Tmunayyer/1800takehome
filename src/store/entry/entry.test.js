import { expectSaga } from 'redux-saga-test-plan'

import entryStoreReducer, {
  entryInitialState,
  setEntries,
  setSearch,
  setSearchResults,
  setEditEntry,
  editEntryField,
  saveEditEntry,
  entrySagas,
  entrySagaCreators,
} from '../entry/entry'

test('entryStore: intial state', () => {
  // Arrange
  const nextState = entryInitialState

  // Act
  const result = entryStoreReducer(entryInitialState, {})

  // Assert
  expect(result).toEqual(nextState)
})

test('entryStore: setEntries', () => {
  // Arrange
  const fakeData = [
    { id: 1, userId: 1, title: 'test-title', body: 'test-body' },
  ]
  const nextState = {
    ...entryInitialState,
    entries: { data: fakeData, status: 'loaded' },
  }

  // Act
  const result = entryStoreReducer(entryInitialState, setEntries(fakeData))

  // Assert
  expect(result).toEqual(nextState)
})

test('entryStore: setSearch', () => {
  // Arrange
  const fakeSearch = 'term'

  const nextState = {
    ...entryInitialState,
    search: 'term',
  }

  // Act
  const result = entryStoreReducer(entryInitialState, setSearch(fakeSearch))

  // Assert
  expect(result).toEqual(nextState)
})

test('entryStore: setSearchResults', () => {
  // Arrange
  const fakeSearch = 'term'
  const fakeData = [0]

  const nextState = {
    ...entryInitialState,
    searchResults: { data: fakeData, term: fakeSearch },
  }

  // Act
  const result = entryStoreReducer(
    entryInitialState,
    setSearchResults({ results: fakeData, term: fakeSearch }),
  )

  // Assert
  expect(result).toEqual(nextState)
})

test('entryStore: setEditEntry', () => {
  // Arrange
  const fakeData = [
    { id: 1, userId: 1, title: 'test-title', body: 'test-body' },
  ]

  const nextState = {
    ...entryInitialState,
    entries: { data: fakeData, status: 'loaded' },
    editEntry: fakeData[0],
  }

  // Act
  const initialWithData = {
    ...entryInitialState,
    entries: { data: fakeData, status: 'loaded' },
  }
  const result = entryStoreReducer(initialWithData, setEditEntry(1))

  // Assert
  expect(result).toEqual(nextState)
})

test('entryStore: editEntryField', () => {
  // Arrange
  const fakeData = {
    id: 1,
    userId: 1,
    title: 'test-title',
    body: 'test-body',
  }

  const nextState = {
    ...entryInitialState,
    editEntry: { ...fakeData, title: 'test-title-altered' },
  }

  // Act
  const initialWithData = {
    ...entryInitialState,
    editEntry: fakeData,
  }
  const result = entryStoreReducer(
    initialWithData,
    editEntryField({ name: 'title', value: 'test-title-altered' }),
  )

  // Assert
  expect(result).toEqual(nextState)
})

test('entryStore: saveEditEntry', () => {
  // Arrange
  const fakeData = [
    { id: 1, userId: 1, title: 'test-title', body: 'test-body' },
  ]

  const nextState = {
    ...entryInitialState,
    entries: {
      data: [
        { id: 1, userId: 1, title: 'test-title-altered', body: 'test-body' },
      ],
      status: 'loaded',
    },
    editEntry: { ...fakeData[0], title: 'test-title-altered' },
  }

  // Act
  const initialWithData = {
    ...entryInitialState,
    entries: { data: fakeData, status: 'loaded' },
    editEntry: { ...fakeData[0], title: 'test-title-altered' },
  }
  const result = entryStoreReducer(initialWithData, saveEditEntry())

  // Assert
  expect(result).toEqual(nextState)
})

test('entryStore: fetchEntries', () => {
  const [fetchEntries] = entrySagas

  const fakeResponse = [{ id: 1, userId: 1, title: 'title', body: 'body' }]

  const env = {
    api: {
      get: () => fakeResponse,
    },
  }

  expectSaga(fetchEntries, env)
    // what will happen
    .put(setEntries(fakeResponse))
    // to trigger saga
    .dispatch(entrySagaCreators.fetchEntries())
    // go
    .run()
})

test('entryStore: searchEntries', () => {
  const [, searchEntries] = entrySagas

  const fakeResponse = [{ id: 1, userId: 1, title: 'title', body: 'body' }]

  const env = {
    store: {
      getState() {
        return {
          ...entryInitialState,
          entries: { data: fakeResponse, status: 'loaded' },
          search: 'title',
        }
      },
    },
  }

  expectSaga(searchEntries, env)
    // what will happen
    .put(setSearchResults({ results: [0], term: 'title' }))
    // to trigger saga
    .dispatch(entrySagaCreators.searchEntries())
    // go
    .run()
})
