import Elysia, { t } from 'elysia'

import { db } from '../../db/connection'
import { users } from '../../db/schema'

export const registerUser = new Elysia().post(
  '/users',
  async ({ body, set }) => {
    const { name, email } = body

    const userWithEmail = await db.query.users.findFirst({
      where(fields, operators) {
        return operators.eq(fields.email, email)
      },
    })

    if (userWithEmail) {
      set.status = 409
      return { message: 'User already exists' }
    }

    await db.insert(users).values({
      name,
      email,
    })

    set.status = 201
  },
  {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: 'email' }),
    }),
  },
)