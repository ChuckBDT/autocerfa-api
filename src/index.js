import Fastify from 'fastify'
import getVehicleStock from './routes/getVehicleStock.js'

const fastify = Fastify({
  logger: true,
})

const prefix = 'v1'

fastify.register(getVehicleStock, { prefix })

fastify.listen({ port: Number(process.env.PORT) || 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
