import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import EditProduct from '../pages/EditProduct'

const navigateMock = vi.fn()

vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' }),
  useNavigate: () => navigateMock
}))

afterEach(() => {
  vi.clearAllMocks()
})

test('loads existing product and updates it with a patch request', async () => {
  const existingProduct = {
    id: 1,
    name: 'Demo Product',
    price: 80,
    category: 'Test',
    image: 'https://example.com/image.jpg',
    description: 'Demo description'
  }

  globalThis.fetch = vi.fn()
  fetch.mockResolvedValueOnce({
    json: () => Promise.resolve(existingProduct)
  })
  fetch.mockResolvedValueOnce({
    json: () => Promise.resolve(existingProduct)
  })

  render(<EditProduct />)

  await waitFor(() => {
    // ensure field exists (getByDisplayValue will throw if missing)
    screen.getByDisplayValue('Demo Product')
  })

  fireEvent.change(screen.getByDisplayValue('Demo Product'), {
    target: { name: 'name', value: 'Updated Product' }
  })

  fireEvent.click(screen.getByRole('button', { name: /Update Product/i }))

  await waitFor(() => {
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      'http://localhost:3000/products/1',
      expect.objectContaining({
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...existingProduct,
          name: 'Updated Product'
        })
      })
    )
    expect(navigateMock).toHaveBeenCalledWith('/products')
  })
})
