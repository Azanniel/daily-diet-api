import Elysia, { t } from 'elysia'

import { db } from '../../db/connection'
import { meals } from '../../db/schema'
import { session } from '../middlewares/session'

export const createMeal = new Elysia().use(session).post(
  '/meals',
  async ({ body, set, getCurrentSession }) => {
    const { user } = await getCurrentSession()
    const { name, description, isOnDiet, date } = body

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
