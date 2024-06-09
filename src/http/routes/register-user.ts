import Elysia, { t } from 'elysia'

import { db } from '../../db/connection'
import { users } from '../../db/schema'
import { auth } from '../auth'

export const registerUser = new Elysia().use(auth).post(
  '/users',
  async ({ body, set, signUser }) => {
    const { name, email } = body

    const userWithEmail = await db.query.users.findFirst({
      where(fields, operators) {
        return operators.eq(fields.email, email)
      },
    })

    if (userWithEmail) {
      set.status = 409

      if (userWithEmail.sessionId) {
        signUser(userWithEmail.sessionId)
      }

      return { message: 'User already exists' }
    }

    const sessionId = crypto.randomUUID().toString()

    signUser(sessionId)

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
