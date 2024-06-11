import { describe, expect, it } from 'bun:test'
import { makeMeal } from 'test/factories/make-meal'
import { makeUser } from 'test/factories/make-user'

import { app } from '../app'

describe('Get meal', () => {
  it('should be able to get a meal by id', async () => {
    const user = await makeUser({ id: 'user-01' })
    const meal = await makeMeal({ id: 'meal-01', userId: 'user-01' })

    const request = new Request(`http://localhost:3333/meals/${meal.id}`, {
      method: 'GET',
      headers: {
        Cookie: `sessionId=${user.sessionId}`,
        'Content-Type': 'application/json',
      },
    })

    const response = await app.handle(request)

    expect(response.status).toBe(200)
    expect(response.json()).resolves.toEqual(
      expect.objectContaining({
        id: 'meal-01',
        userId: 'user-01',
      }),
    )
  })
})
