import Elysia from 'elysia'

import { db } from '@/db/connection'

import { auth } from '../middlewares/auth'

export const fetchMeals = new Elysia()
  .use(auth)
  .get('/meals', async ({ getCurrentUser }) => {
    const { user } = await getCurrentUser()

    const meals = await db.query.meals.findMany({
      where(fields, operators) {
        return operators.eq(fields.userId, user.id)
      },
    })

    return { meals }
  })
