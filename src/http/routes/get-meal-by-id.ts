import Elysia, { t } from 'elysia'

import { db } from '@/db/connection'

import { auth } from '../auth'

export const getMealById = new Elysia().use(auth).get(
  '/meals/:mealId',
  async ({ params, getCurrentUser, set }) => {
    const { mealId } = params
    const { user } = await getCurrentUser()

    const meal = await db.query.meals.findFirst({
      where(fields, operators) {
        return operators.and(
          operators.eq(fields.id, mealId),
          operators.eq(fields.userId, user.id),
        )
      },
    })

    if (!meal) {
      set.status = 400

      return { message: 'Meal not found.' }
    }

    return meal
  },
  {
    params: t.Object({
      mealId: t.String(),
    }),
  },
)
