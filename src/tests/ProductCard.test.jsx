import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import ProductCard from '../components/ProductCard'

const mockProduct = {
  id: 1,
  name: 'Test Product',
  price: 100,
  category: 'Test Category',
  image: 'test.jpg',
  description: 'Test description'
}

test('renders product card with details', () => {
  const handleDelete = vi.fn()
  render(
    <BrowserRouter>
      <ProductCard product={mockProduct} handleDelete={handleDelete} />
    </BrowserRouter>
  )

  expect(screen.getByText('Test Product')).toBeTruthy()
  expect(screen.getByText('Ksh 100')).toBeTruthy()
  expect(screen.getByText('Test Category')).toBeTruthy()
  expect(screen.getByText('Test description')).toBeTruthy()
  expect(screen.getByRole('img').getAttribute('src')).toBe('test.jpg')
})