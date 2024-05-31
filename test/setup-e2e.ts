import Database from 'bun:sqlite'
import { afterAll, beforeAll } from 'bun:test'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'

import { meals, users } from '../src/db/schema'
import { env } from '../src/env'

let connection: Database

beforeAll(async () => {
  connection = new Database(env.DATABASE_URL, { create: true })
  const db = drizzle(connection)

  migrate(db, {
    migrationsFolder: './drizzle',
    migrationsTable: '__migrations__',
  })

  await db.delete(users)
  await db.delete(meals)
})

afterAll(() => {
  connection.close()
})
