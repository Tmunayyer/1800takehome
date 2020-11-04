import React from 'react'
import { render, screen, fireEvent, createEvent } from '@testing-library/react'
import { Entry } from '../index'

const testData = {
  id: 1,
  userId: 2,
  title: 'test-title',
  body: 'test-body',
}

test('entry: renders', () => {
  render(<Entry data={testData} index={0} />)
  const buttonElement = screen.getByText('test-title')
  expect(buttonElement).toBeInTheDocument()
})

test('entry: onClick', () => {
  const spy = jest.fn()
  render(<Entry data={testData} onClick={spy} index={0} />)
  const buttonElement = screen.getByText('test-title')
  expect(buttonElement).toBeInTheDocument()

  const myEvent = createEvent.click(buttonElement, { button: 1 })
  fireEvent(buttonElement, myEvent)
  expect(spy).toHaveBeenCalled()
})
