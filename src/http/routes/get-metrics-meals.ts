import Elysia from 'elysia'

import { db } from '@/db/connection'

import { auth } from '../middlewares/auth'

export const getMetricsMeals = new Elysia()
  .use(auth)
  .get('/meals/metrics', async ({ getCurrentUser }) => {
    const { user } = await getCurrentUser()

    const totalMeals = await db.query.meals.findMany({
      where(fields, operators) {
        return operators.eq(fields.userId, user.id)
      },
    })

    const totalMealsOnDiet = totalMeals.filter((meal) => meal.isOnDiet).length
    const totalMealsOffDiet = totalMeals.filter((meal) => !meal.isOnDiet).length

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
      totalMealsOnDiet,
      totalMealsOffDiet,
      bestOnDietSequence,
    }
  })
