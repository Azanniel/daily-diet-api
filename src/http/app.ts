import { Elysia } from 'elysia'

import { createMeal } from './routes/create-meal'
import { registerUser } from './routes/register-user'

const app = new Elysia().use(registerUser).use(createMeal)

export { app }
