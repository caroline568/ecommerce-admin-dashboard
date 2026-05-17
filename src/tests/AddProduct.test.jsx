import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import AddProduct from '../pages/AddProduct'

const navigateMock = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock
}))

afterEach(() => {
  vi.clearAllMocks()
})

test('submits a new product and navigates to products page', async () => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    json: () => Promise.resolve({})
  })

  render(<AddProduct />)

  fireEvent.change(screen.getByPlaceholderText('Product Name'), {
    target: { value: 'Demo Product', name: 'name' }
  })
  fireEvent.change(screen.getByPlaceholderText('Price'), {
    target: { value: '50', name: 'price' }
  })
  fireEvent.change(screen.getByPlaceholderText('Category'), {
    target: { value: 'Test', name: 'category' }
  })
  fireEvent.change(screen.getByPlaceholderText('Image URL'), {
    target: { value: 'https://example.com/image.jpg', name: 'image' }
  })
  fireEvent.change(screen.getByPlaceholderText('Description'), {
    target: { value: 'Test description', name: 'description' }
  })

  fireEvent.click(screen.getByRole('button', { name: /Add Product/i }))

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Demo Product',
        price: '50',
        category: 'Test',
        image: 'https://example.com/image.jpg',
        description: 'Test description'
      })
    })

    expect(navigateMock).toHaveBeenCalledWith('/products')
  })
})
