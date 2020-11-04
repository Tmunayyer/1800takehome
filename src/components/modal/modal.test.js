import React from 'react'
import { render, screen, fireEvent, createEvent } from '@testing-library/react'
import { Modal } from '../index'

test('modal: renders', () => {
  render(
    <Modal show={true} onClickOutside={jest.fn()}>
      <div>child</div>
    </Modal>,
  )
  const modalElement = screen.getByText('child')
  expect(modalElement).toBeInTheDocument()
})

test('modal: onClickOutside', () => {
  const spy = jest.fn()
  render(
    <Modal show={true} onClickOutside={spy}>
      <div>child</div>
    </Modal>,
  )
  const innerDivElement = screen.getByText('child')
  expect(innerDivElement).toBeInTheDocument()

  // first check if it fired on "inside" click
  const insideClick = createEvent.click(innerDivElement, { button: 1 })
  fireEvent(innerDivElement, insideClick)
  expect(spy).toHaveBeenCalledTimes(0)

  // now click "outside"
  const modalElement = innerDivElement.parentElement
  const outsideClick = createEvent.click(modalElement, { button: 1 })
  fireEvent(modalElement, outsideClick)
  expect(spy).toHaveBeenCalledTimes(1)
})
