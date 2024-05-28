import { Elysia } from 'elysia'

import { registerUser } from './routes/register-user'

const app = new Elysia().use(registerUser)

export { app }
