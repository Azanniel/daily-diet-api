import { Elysia } from 'elysia'

import { env } from '../env'
import { registerUser } from './routes/register-user'

const app = new Elysia().use(registerUser)

app.listen(env.PORT, () => {
  console.log(`🔥 Server is running on port ${env.PORT}`)
})

export { app }
