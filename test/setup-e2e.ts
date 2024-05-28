import { beforeAll } from 'bun:test'

import { db } from '../src/db/connection'
import { users } from '../src/db/schema'

beforeAll(async () => {
  await db.delete(users)
})
