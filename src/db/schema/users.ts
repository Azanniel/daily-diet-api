import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { meals } from './meals'

export const users = sqliteTable('users', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  sessionId: text('session_id'),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
})

export const usersRelations = relations(users, ({ many }) => {
  return {
    meals: many(meals),
  }
})
