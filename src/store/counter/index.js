import { createSlice } from '@reduxjs/toolkit'
import { put, call, take } from 'redux-saga/effects'
import sagaFactory from '../saga/sagaFactory'

const initialState = { value: 0 }

const counterSlice = createSlice({
  name: 'counterStore',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export const [counterSagas, counterSagaCreators] = sagaFactory({
  incrementAfterSaga: function* incrementAfterSaga(time) {
    while (true) {
      const { payload } = yield take('incrementAfterSaga')
      yield call(delay, payload)
      const action = increment()
      yield put(action)
    }
  },
})
