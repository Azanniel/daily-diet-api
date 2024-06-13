import Elysia, { t } from 'elysia'

import { db } from '@/db/connection'
import { meals } from '@/db/schema'

import { auth } from '../middlewares/auth'

export const createMeal = new Elysia().use(auth).post(
  '/meals',
  async ({ body, set, getCurrentUser }) => {
    const { name, description, isOnDiet, date } = body

    const { user } = await getCurrentUser()

    await db.insert(meals).values({
      name,
      description,
      isOnDiet,
      date,
      userId: user.id,
    })

    set.status = 201
  },
  {
    body: t.Object({
      name: t.String(),
      description: t.String(),
      isOnDiet: t.Boolean(),
      date: t.Date(),
    }),
  },
)
