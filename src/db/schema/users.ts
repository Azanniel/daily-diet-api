import { createId } from '@paralleldrive/cuid2'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  sessionId: text('session_id'),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
})
