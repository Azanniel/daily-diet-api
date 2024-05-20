import { describe, expect, it } from 'bun:test'

import { app } from '../server'

describe('Register user', () => {
  it('should be able to register a new user', async () => {
    const user = {
      name: 'John Doe',
      email: 'john.doe@mail.com',
    }

    const request = new Request('http://localhost:3333/register', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await app.handle(request)

    expect(response.status).toBe(201)
  })
})
