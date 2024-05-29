import { describe, expect, it } from 'bun:test'

import { app } from '../app'

describe('Register user', () => {
  it('should be able to register a new user', async () => {
    const user = {
      name: 'John Doe',
      email: 'john.doe@mail.com',
    }

    const request = new Request('http://localhost:3333/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await app.handle(request)

    expect(response.status).toBe(201)
    expect(response.headers.getSetCookie()).toEqual(
      expect.arrayContaining([expect.stringContaining('sessionId')]),
    )
  })
})
