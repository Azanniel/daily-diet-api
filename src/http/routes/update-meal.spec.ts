import { describe, expect, it } from 'bun:test'
import { makeMeal } from 'test/factories/make-meal'
import { makeUser } from 'test/factories/make-user'

import { app } from '../app'

describe('Update a meal', () => {
  it('should be able to update a meal', async () => {
    const user = await makeUser({ id: 'user-01' })
    const meal = await makeMeal({ id: 'meal-01', userId: 'user-01' })

    const updatedMeal = {
      name: 'Bacon',
      description: 'Delicious bacon',
      isOnDiet: false,
      date: new Date(),
    }

    const request = new Request(`http://localhost:3333/meals/${meal.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedMeal),
      headers: {
        Cookie: `sessionId=${user.sessionId}`,
        'Content-Type': 'application/json',
      },
    })

    const response = await app.handle(request)

    expect(response.status).toBe(204)
  })
})
