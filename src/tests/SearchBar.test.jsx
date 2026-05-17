import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import SearchBar from '../components/SearchBar'

test('renders search input and handles change', () => {
  const setSearch = vi.fn()
  render(<SearchBar search="" setSearch={setSearch} />)

  const input = screen.getByPlaceholderText('Search products...')
  expect(input).toBeTruthy()

  fireEvent.change(input, { target: { value: 'test' } })
  expect(setSearch).toHaveBeenCalledWith('test')
})