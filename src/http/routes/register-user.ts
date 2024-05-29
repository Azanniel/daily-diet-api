import Elysia, { t } from 'elysia'

import { db } from '../../db/connection'
import { users } from '../../db/schema'

export const registerUser = new Elysia().post(
  '/users',
  async ({ body, set, cookie }) => {
    const { name, email } = body

    let sessionId = cookie.sessionId.value

    if (!sessionId) {
      sessionId = crypto.randomUUID().toString()

      cookie.sessionId.set({
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        value: sessionId,
      })
    }

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
      sessionId,
    })

    set.status = 201
  },
  {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: 'email' }),
    }),
    cookie: t.Cookie({
      sessionId: t.Optional(t.String()),
    }),
  },
)
