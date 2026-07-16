import fastifyPlugin from 'fastify-plugin'
import supaClient from '../lib/supabase.js'

const authPlugin = async fastify => {
  fastify.decorateRequest('autocerfaToken', null)
  fastify.addHook('onRequest', async (request, reply) => {
    // if AUTOCERFA_TOKEN is set, then it's self hosted
    if (process.env.AUTOCERFA_TOKEN) {
      request.autocerfaToken = process.env.AUTOCERFA_TOKEN
      return
    }

    const headersAuth = request.headers['authorization']

    if (!headersAuth || !headersAuth.startsWith('Bearer '))
      return reply.code(401).send({ error: 'Missing or invalid API key' })

    const apiKey = headersAuth.split(' ')[1]

    const { data: user, error } = await supaClient
      .from('users')
      .select('id, autocerfa_token, plan')
      .eq('api_key', apiKey)
      .single()

    if (error || !user) {
      return reply.code(401).send({ error: 'Invalid API key' })
    }

    if (!user.autocerfa_token)
      return reply.code(403).send({ error: 'No Autocerfa account connected. Connect your account from the dashboard.' })

    const { data: newCount, error: usageError } = await supaClient.rpc('increment_usage', {
      p_user_id: user.id,
    })

    if (usageError) {
      request.log.error(usageError, 'increment_usage failed')
      return reply.code(500).send({ error: 'Internal error' })
    }

    if (user.plan === 'free' && newCount > 1) {
      return reply
        .code(429)
        .send({ error: 'Free plan limit reached. Upgrade to a paid plan to continue using the API.' })
    }

    request.autocerfaToken = user.autocerfa_token
  })
}

export default fastifyPlugin(authPlugin)
