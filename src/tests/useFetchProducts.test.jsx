import { renderHook, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import useFetchProducts from '../hooks/useFetchProducts'

// Mock fetch
globalThis.fetch = vi.fn()

test('fetches products successfully', async () => {
  const mockProducts = [{ id: 1, name: 'Test' }]
  fetch.mockResolvedValueOnce({
    json: () => Promise.resolve(mockProducts)
  })

  const { result } = renderHook(() => useFetchProducts('http://localhost:3000/products'))

  await waitFor(() => {
    expect(result.current[0]).toEqual(mockProducts)
    expect(result.current[2]).toBe(false)
    expect(result.current[2]).toBe(false)
  })
})