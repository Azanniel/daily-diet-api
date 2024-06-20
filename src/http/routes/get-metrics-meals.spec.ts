import { describe, expect, it } from 'bun:test'
import { makeMeal } from 'test/factories/make-meal'
import { makeUser } from 'test/factories/make-user'

import { app } from '../app'

describe('Get metrics meals', () => {
  it('should be able to get metrics', async () => {
    const user = await makeUser({ id: 'user-01' })

    for (let i = 0; i < 10; i++) {
      if (i < 6) {
        await makeMeal({ userId: 'user-01', isOnDiet: true })
      } else {
        await makeMeal({ userId: 'user-01' })
      }
    }

    const request = new Request(`http://localhost:3333/meals/metrics`, {
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
        totalMeals: 10,
        totalMealsOnDiet: 6,
        totalMealsOffDiet: 4,
        bestOnDietSequence: 6,
      }),
    )
  })
})
