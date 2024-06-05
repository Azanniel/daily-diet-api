import Elysia from 'elysia'

import { db } from '../../db/connection'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const session = new Elysia()
  .error({
    UNAUTHORIZED: UnauthorizedError,
  })
  .onError(({ error, code, set }) => {
    if (code === 'UNAUTHORIZED') {
      set.status = 401

      return {
        code,
        message: error.message,
      }
    }
  })
  .derive({ as: 'scoped' }, ({ cookie }) => {
    return {
      getCurrentSession: async () => {
        const sessionId = cookie.sessionId.value

        if (!sessionId) {
          throw new UnauthorizedError()
        }

        const userWithSession = await db.query.users.findFirst({
          where(fields, operators) {
            return operators.eq(fields.sessionId, sessionId)
          },
        })

        if (!userWithSession) {
          throw new UnauthorizedError()
        }

        return {
          sessionId,
          user: userWithSession,
        }
      },
    }
  })
