import React from 'react'
import { render, screen, fireEvent, createEvent } from '@testing-library/react'
import { Popup, PopupHeader, PopupBody, PopupActions } from '../index'

test('popup: renders', () => {
  render(
    <Popup show={true} onClickOutside={jest.fn()}>
      <PopupHeader text={'header'} />
      <PopupBody>
        <div>body</div>
      </PopupBody>
      <PopupActions>
        <div>actions</div>
      </PopupActions>
    </Popup>,
  )
  const headerElement = screen.getByText('header')
  expect(headerElement).toBeInTheDocument()

  const bodyElement = screen.getByText('body')
  expect(bodyElement).toBeInTheDocument()

  const actionElement = screen.getByText('actions')
  expect(actionElement).toBeInTheDocument()
})

test('popup: onClickInside', () => {
  const spy = jest.fn()
  render(
    <Popup show={true} onClickOutside={jest.fn()} onClickInside={spy}>
      <div>child</div>
    </Popup>,
  )
  const innerDivElement = screen.getByText('child').parentElement
  expect(innerDivElement).toBeInTheDocument()

  // click inside
  const insideClick = createEvent.click(innerDivElement, { button: 1 })
  fireEvent(innerDivElement, insideClick)
  expect(spy).toHaveBeenCalledTimes(1)
})
