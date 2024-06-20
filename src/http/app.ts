import { Elysia } from 'elysia'

import { errorHandler } from './error-handler'
import { createMeal } from './routes/create-meal'
import { deleteMeal } from './routes/delete-meal'
import { fetchMeals } from './routes/fetch-meals'
import { getMealById } from './routes/get-meal-by-id'
import { getMetricsMeals } from './routes/get-metrics-meals'
import { registerUser } from './routes/register-user'
import { updateMeal } from './routes/update-meal'

const app = new Elysia()
  .use(errorHandler)
  .use(registerUser)
  .use(createMeal)
  .use(fetchMeals)
  .use(getMealById)
  .use(updateMeal)
  .use(deleteMeal)
  .use(getMetricsMeals)

export { app }
