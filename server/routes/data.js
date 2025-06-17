export default async function (fastify, options) {
    fastify.get('/api/data', async (request, reply) => {
      try {
        const collection = fastify.mongo.db.collection('Market');
        const data = await collection.find({}).toArray();
        reply.send(data);
      } catch (err) {
        reply.code(500).send({ error: 'Database error' });
      }
    });
  }
  