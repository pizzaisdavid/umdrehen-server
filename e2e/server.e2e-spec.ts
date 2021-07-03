
import { Backend } from '../src/client'

describe('toggle', () => {
  let backend: Backend.Client

  beforeEach(async () => {
    backend = new Backend.Client('ws://backend:36361')
  })

  it('turn on', async () => {
    try {
      const result = await backend.toggle()
      expect(result).toBeTrue()
      return await Promise.resolve()
    } catch (error) {
      return await Promise.reject(error)
    }
  })

})
