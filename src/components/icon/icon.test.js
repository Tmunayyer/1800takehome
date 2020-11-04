import React from 'react'
import { render, screen } from '@testing-library/react'
import { Icon } from '../index'

test('icon: search', () => {
  render(<Icon icon={'search'} />)
  const inputElement = screen.getByAltText('Search')
  expect(inputElement).toBeInTheDocument()
})
