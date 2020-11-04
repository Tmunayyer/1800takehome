import React from 'react'
import { render, screen, fireEvent, createEvent } from '@testing-library/react'
import { Button } from '../index'

test('button: renders', () => {
  render(<Button text={'test-button'} onClick={jest.fn} disabled={false} />)
  const buttonElement = screen.getByText('test-button')
  expect(buttonElement).toBeInTheDocument()
})

test('button: onClick', () => {
  const spy = jest.fn()
  render(<Button text={'test-button'} onClick={spy} disabled={false} />)
  const buttonElement = screen.getByText('test-button').parentElement
  expect(buttonElement).toBeInTheDocument()

  const myEvent = createEvent.click(buttonElement, { button: 1 })
  fireEvent(buttonElement, myEvent)
  expect(spy).toHaveBeenCalled()
})

test('button: onClick disabled', () => {
  const spy = jest.fn()
  render(<Button text={'test-button'} onClick={spy} disabled={true} />)
  const buttonElement = screen.getByText('test-button').parentElement
  expect(buttonElement).toBeInTheDocument()

  const myEvent = createEvent.click(buttonElement, { button: 1 })
  fireEvent(buttonElement, myEvent)
  // not called
  expect(spy).toHaveBeenCalledTimes(0)
})
