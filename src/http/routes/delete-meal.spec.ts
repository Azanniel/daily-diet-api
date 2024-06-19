import { describe, expect, it } from 'bun:test'
import { makeMeal } from 'test/factories/make-meal'
import { makeUser } from 'test/factories/make-user'

import { app } from '../app'

describe('Delete meal', () => {
  it('should be able to delete a meal', async () => {
    const user = await makeUser({ id: 'user-01' })
    const meal = await makeMeal({ userId: 'user-01' })

    const request = new Request(`http://localhost:3333/meals/${meal.id}`, {
      method: 'DELETE',
      headers: {
        Cookie: `sessionId=${user.sessionId}`,
        'Content-Type': 'application/json',
      },
    })

    const response = await app.handle(request)

    expect(response.status).toBe(204)
  })
})
