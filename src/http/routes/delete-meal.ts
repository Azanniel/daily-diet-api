import { eq } from 'drizzle-orm'
import Elysia, { t } from 'elysia'

import { db } from '@/db/connection'
import { meals } from '@/db/schema'

import { NotFoundError } from '../errors/not-found-error'
import { auth } from '../middlewares/auth'

export const deleteMeal = new Elysia().use(auth).delete(
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
      throw new NotFoundError('Meal not found.')
    }

    await db.delete(meals).where(eq(meals.id, mealId))

    set.status = 204
  },
  {
    params: t.Object({
      mealId: t.String(),
    }),
  },
)
