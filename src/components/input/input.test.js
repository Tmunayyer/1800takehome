import React from 'react'
import { render, screen, fireEvent, createEvent } from '@testing-library/react'
import { Input, TextArea } from '../index'

test('input: renders', () => {
  render(
    <Input
      label={'test-input'}
      value={'test-value'}
      onChangeHandler={jest.fn()}
    />,
  )
  const labelElement = screen.getByText('test-input')
  expect(labelElement).toBeInTheDocument()
})

test('input: onChange', () => {
  const spy = jest.fn()
  render(
    <Input
      placeholder={'test-placeholder'}
      value={'test-value'}
      onChangeHandler={spy}
    />,
  )
  const inputElement = screen.getByPlaceholderText('test-placeholder')
  expect(inputElement).toBeInTheDocument()

  const myEvent = createEvent.change(inputElement, {
    target: { value: 'value' },
  })
  fireEvent(inputElement, myEvent)
  expect(spy).toHaveBeenCalled()
})

test('textarea: renders', () => {
  render(
    <TextArea
      label={'test-input'}
      value={'test-value'}
      onChangeHandler={jest.fn()}
    />,
  )
  const labelElement = screen.getByText('test-input')
  expect(labelElement).toBeInTheDocument()

  const valueElement = screen.getByText('test-value')
  expect(valueElement).toBeInTheDocument()
})

test('textArea: onChange', () => {
  const spy = jest.fn()
  render(
    <TextArea
      placeholder={'test-placeholder'}
      value={'test-value'}
      onChangeHandler={spy}
    />,
  )
  const textareaElement = screen.getByPlaceholderText('test-placeholder')
  expect(textareaElement).toBeInTheDocument()

  const myEvent = createEvent.change(textareaElement, {
    target: { value: 'value' },
  })
  fireEvent(textareaElement, myEvent)
  expect(spy).toHaveBeenCalled()
})
