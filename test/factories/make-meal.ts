import { faker } from '@faker-js/faker'

import { db } from '../../src/db/connection'
import { meals } from '../../src/db/schema'

type Meal = typeof meals.$inferSelect

export async function makeMeal(override?: Partial<Meal>) {
  const [meal] = await db
    .insert(meals)
    .values({
      id: crypto.randomUUID(),
      userId: crypto.randomUUID(),
      name: faker.word.words({ count: 2 }),
      description: faker.lorem.paragraph(),
      date: new Date(),
      ...override,
    })
    .returning()

  return meal
}
