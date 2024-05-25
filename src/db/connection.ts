import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'

import { env } from '../env'
import * as schema from './schema'

const connection = new Database(env.DATABASE_URL, { create: true })
export const db = drizzle(connection, { schema })
