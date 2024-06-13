import Elysia, { t } from 'elysia'

import { db } from '../../db/connection'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const auth = new Elysia()
  .guard({ cookie: t.Cookie({ sessionId: t.String() }) })
  .derive(({ cookie }) => {
    return {
      signUser: (sessionId: string) => {
        cookie.sessionId.set({
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 1 week
          value: sessionId,
        })
      },

      getCurrentUser: async () => {
        const sessionId = cookie.sessionId.value

        if (!sessionId) {
          throw new UnauthorizedError()
        }

        const user = await db.query.users.findFirst({
          where(fields, operators) {
            return operators.eq(fields.sessionId, sessionId)
          },
        })

        if (!user) {
          throw new UnauthorizedError()
        }

        return { user }
      },
    }
  })
  .propagate()
