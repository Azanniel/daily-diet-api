import Elysia, { t } from 'elysia'

export const registerUser = new Elysia().post(
  '/register',
  async ({ body, set }) => {
    const { name, email } = body

    console.log('Registering user => ', name, email)

    set.status = 201
  },
  {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: 'email' }),
    }),
  },
)
