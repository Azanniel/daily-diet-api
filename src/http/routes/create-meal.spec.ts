import { describe, expect, it } from 'bun:test'
import { makeUser } from 'test/factories/make-user'

import { app } from '../app'

describe('Create a meal', () => {
  it('should be able to create a meal', async () => {
    const user = await makeUser()

    const meal = {
      name: 'Bacon',
      description: 'Delicious bacon',
      isOnDiet: true,
      date: new Date(),
    }

    const request = new Request('http://localhost:3333/meals', {
      method: 'POST',
      body: JSON.stringify(meal),
      headers: {
        Cookie: `sessionId=${user.sessionId}`,
        'Content-Type': 'application/json',
      },
    })

    const response = await app.handle(request)

    expect(response.status).toBe(201)
  })
})
