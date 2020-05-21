const Hapi = require('@hapi/hapi')
const Joi = require('@hapi/joi')

const schema = Joi.object({
  // This object is what our object will need to look like
  username: Joi.string().alphanum().min(4).max(20).required(),
  password: Joi.string().min(12).required(),
})

const init = async () => {
  const server = Hapi.server({
    port: 4321,
    host: 'localhost',
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: () => {
      return 'it works'
    },
  })

  server.route({
    method: 'POST',
    path: '/',
    handler: async ({ payload }) => {
      try {
        const input = await schema.validateAsync(payload, {
          abortEarly: false,
        })
        // Data is valid, let's move on!
        return input
      } catch (error) {
        // Data is invalid, let's tell our user the bad news...
        return error.details
      }
    },
  })

  await server.start()
  console.info('Node Server running at http://localhost:4321')
}

init()
