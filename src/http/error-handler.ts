import Elysia from 'elysia'

import { ConflictError } from './errors/conflict-error'
import { NotFoundError } from './errors/not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'

export const errorHandler = new Elysia()
  .error({
    NOT_FOUND: NotFoundError,
    CONFLICT: ConflictError,
    UNAUTHORIZED: UnauthorizedError,
  })
  .onError(({ code, error, set }) => {
    if (code === 'VALIDATION') {
      set.status = error.status
      return error.toResponse()
    }

    if (code === 'NOT_FOUND') {
      set.status = 404
      return { message: error.message }
    }

    if (code === 'CONFLICT') {
      set.status = 409
      return { message: error.message }
    }

    if (code === 'UNAUTHORIZED') {
      set.status = 401
      return { message: error.message }
    }

    console.error(error)

    set.status = 500
    return { message: 'Internal server error' }
  })
  .propagate()
