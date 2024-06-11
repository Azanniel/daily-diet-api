import { Elysia } from 'elysia'

import { createMeal } from './routes/create-meal'
import { fetchMeals } from './routes/fetch-meals'
import { registerUser } from './routes/register-user'

const app = new Elysia().use(registerUser).use(createMeal).use(fetchMeals)

export { app }
