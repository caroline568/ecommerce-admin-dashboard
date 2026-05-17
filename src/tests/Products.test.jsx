import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Products from '../pages/Products'

afterEach(() => {
  vi.clearAllMocks()
})

test('renders products, filters results, and deletes a product', async () => {
  const mockProducts = [
    {
      id: 1,
      name: 'First Product',
      price: 100,
      category: 'Test',
      image: 'https://example.com/first.jpg',
      description: 'First description'
    },
    {
      id: 2,
      name: 'Second Product',
      price: 200,
      category: 'Test',
      image: 'https://example.com/second.jpg',
      description: 'Second description'
    }
  ]

  globalThis.fetch = vi.fn()
  fetch.mockResolvedValueOnce({
    json: () => Promise.resolve(mockProducts)
  })
  fetch.mockResolvedValueOnce({
    json: () => Promise.resolve({})
  })

  render(
    <BrowserRouter>
      <Products />
    </BrowserRouter>
  )

  await waitFor(() => {
    // existence implied by getByText throwing on failure
    screen.getByText('First Product')
    screen.getByText('Second Product')
  })

  fireEvent.change(screen.getByPlaceholderText('Search products...'), {
    target: { value: 'first' }
  })

  expect(screen.getByText('First Product')).toBeTruthy()
  expect(screen.queryByText('Second Product')).toBeNull()

  fireEvent.change(screen.getByPlaceholderText('Search products...'), {
    target: { value: 'missing' }
  })

  expect(screen.getByText('No products found.')).toBeTruthy()

  fireEvent.change(screen.getByPlaceholderText('Search products...'), {
    target: { value: '' }
  })

  // Click the first Delete button (there are multiple)
  fireEvent.click(screen.getAllByRole('button', { name: /Delete/i })[0])

  expect(fetch).toHaveBeenLastCalledWith('http://localhost:3000/products/1', {
    method: 'DELETE'
  })

  await waitFor(() => {
    expect(screen.queryByText('First Product')).toBeNull()
  })
})
