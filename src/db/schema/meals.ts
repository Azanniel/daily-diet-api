import { createId } from '@paralleldrive/cuid2'
import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { users } from './users'

export const meals = sqliteTable('meals', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  isOnDiet: integer('is_on_diet', { mode: 'boolean' })
    .notNull()
    .default(sql`FALSE`),
  date: integer('date', { mode: 'timestamp_ms' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
})

export const mealsRelations = relations(meals, ({ one }) => {
  return {
    user: one(users, {
      fields: [meals.userId],
      references: [users.id],
    }),
  }
})
