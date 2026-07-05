import getVehicleStock from '../lib/autocerfa.js'

async function routes(fastify) {
  fastify.get('/stock', async (request, reply) => {
    try {
      const stock = await getVehicleStock()
      return stock
    } catch (err) {
      if (err.message.includes('AUTOCERFA_TOKEN')) {
        return reply.status(500).send({ error: err.message })
      }
      if (err.name === 'TimeoutError') {
        return reply.status(504).send({ error: 'Upstream API timed out' })
      }
      return reply.status(502).send({ error: err.message })
    }
  })
}

export default routes
