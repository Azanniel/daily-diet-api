import { and, count, eq } from 'drizzle-orm'
import Elysia from 'elysia'

import { db } from '@/db/connection'
import { meals } from '@/db/schema'

import { auth } from '../middlewares/auth'

export const getMetricsMeals = new Elysia()
  .use(auth)
  .get('/meals/metrics', async ({ getCurrentUser }) => {
    const { user } = await getCurrentUser()

    const [totalMealsOnDiet] = await db
      .select({ count: count() })
      .from(meals)
      .where(and(eq(meals.userId, user.id), eq(meals.isOnDiet, true)))

    const [totalMealsOffDiet] = await db
      .select({ count: count() })
      .from(meals)
      .where(and(eq(meals.userId, user.id), eq(meals.isOnDiet, false)))

    const totalMeals = await db.query.meals.findMany({
      where(fields, operators) {
        return operators.eq(fields.userId, user.id)
      },
    })

    const { bestOnDietSequence } = totalMeals.reduce(
      (acc, meal) => {
        if (meal.isOnDiet) {
          acc.currentSequence += 1
        } else {
          acc.currentSequence = 0
        }

        if (acc.currentSequence > acc.bestOnDietSequence) {
          acc.bestOnDietSequence = acc.currentSequence
        }

        return acc
      },
      { bestOnDietSequence: 0, currentSequence: 0 },
    )

    return {
      totalMeals: totalMeals.length,
      totalMealsOnDiet: totalMealsOnDiet.count,
      totalMealsOffDiet: totalMealsOffDiet.count,
      bestOnDietSequence,
    }
  })
