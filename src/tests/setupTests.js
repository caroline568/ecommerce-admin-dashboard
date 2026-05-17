import matchers from '@testing-library/jest-dom/matchers'
import { expect as vitestExpect } from 'vitest'

vitestExpect.extend(matchers)

if (globalThis.expect && typeof globalThis.expect.extend === 'function') {
	globalThis.expect.extend(matchers)
}
