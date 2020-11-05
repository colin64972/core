import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { AppWithTheme } from '../AppWithTheme'

let subject

beforeEach(() => {
  render(
    createElement(MemoryRouter, { initialEntries: ['/error'] }, AppWithTheme)
  )
})

describe('NotFound', () => {
  test('renders heading', () => {
    subject = screen.getByRole('heading', { level: 1 })
    expect(subject.tagName).toBe('H1')
    expect(subject.innerHTML).toContain('Error')
  })

  test('renders copy', () => {
    subject = screen.getByText('Sorry', {
      exact: false
    })
    expect(subject.tagName).toBe('P')
  })

  test('renders link to home', () => {
    subject = screen.getByRole('link', { name: /home/i })
    expect(subject).toHaveAttribute('href', '/')
  })

  test('click link to home', () => {
    subject = screen.getByRole('link', { name: /home/i })
    userEvent.click(subject)
    expect(screen.getByRole('link', { name: /start/i })).toBeInTheDocument()
  })
})
