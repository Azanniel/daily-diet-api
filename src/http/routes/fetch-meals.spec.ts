import { describe, expect, it } from 'bun:test'
import { makeMeal } from 'test/factories/make-meal'
import { makeUser } from 'test/factories/make-user'

import { app } from '../app'

describe('Fetch meals', () => {
  it('should be able to list all meals from a user', async () => {
    const user = await makeUser({ id: 'user-01' })

    await makeMeal({ id: 'meal-01', userId: 'user-01' })
    await makeMeal({ id: 'meal-02', userId: 'user-01' })

    const request = new Request('http://localhost:3333/meals', {
      method: 'GET',
      headers: {
        Cookie: `sessionId=${user.sessionId}`,
        'Content-Type': 'application/json',
      },
    })

    const response = await app.handle(request)

    expect(response.status).toBe(200)
    expect(response.json()).resolves.toEqual({
      meals: expect.arrayContaining([
        expect.objectContaining({ id: 'meal-01', userId: 'user-01' }),
        expect.objectContaining({ id: 'meal-02', userId: 'user-01' }),
      ]),
    })
  })
})
