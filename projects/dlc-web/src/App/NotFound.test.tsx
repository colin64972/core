import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { NotFound } from './NotFound'

let root, subject

beforeEach(() => {
  root = render(<NotFound />, {
    wrapper: BrowserRouter
  })
})

describe('NotFound', () => {
  test('renders heading', () => {
    subject = screen.getByRole('heading', { level: 1 })
    expect(subject.tagName).toBe('H1')
    expect(subject.innerHTML).toContain('ERROR')
  })

  test('renders copy', () => {
    subject = screen.getByText('Kasd', {
      exact: false
    })
    expect(subject.tagName).toBe('P')
  })
})
