import { eq } from 'drizzle-orm'
import Elysia, { t } from 'elysia'

import { db } from '@/db/connection'
import { meals } from '@/db/schema'

import { NotFoundError } from '../errors/not-found-error'
import { auth } from '../middlewares/auth'

export const updateMeal = new Elysia().use(auth).put(
  '/meals/:mealId',
  async ({ params, body, getCurrentUser, set }) => {
    const { mealId } = params
    const { name, description, isOnDiet, date } = body

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

    await db
      .update(meals)
      .set({
        name,
        description,
        isOnDiet,
        date,
      })
      .where(eq(meals.id, mealId))

    set.status = 204
  },
  {
    params: t.Object({ mealId: t.String() }),
    body: t.Object({
      name: t.String(),
      description: t.String(),
      isOnDiet: t.Boolean(),
      date: t.Date(),
    }),
  },
)
