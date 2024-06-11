import { faker } from '@faker-js/faker'

import { db } from '../../src/db/connection'
import { users } from '../../src/db/schema'

type User = typeof users.$inferSelect

export async function makeUser(override?: Partial<User>) {
  const [user] = await db
    .insert(users)
    .values({
      id: crypto.randomUUID(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      sessionId: crypto.randomUUID(),
      ...override,
    })
    .returning()

  return user
}
