import Database from 'bun:sqlite'
import chalk from 'chalk'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'

import { env } from '../env'

const connection = new Database(env.DATABASE_URL, { create: true })
const db = drizzle(connection)

migrate(db, {
  migrationsFolder: './drizzle',
  migrationsTable: '__migrations__',
})
connection.close()

console.log(chalk.greenBright('Migrations applied successfully!'))

process.exit()
