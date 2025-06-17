import { ObjectId } from 'mongodb';

export async function searchRoutes(fastify) {
  fastify.get('/search', async (request, reply) => {
    try {
      const { q, category, author, region } = request.query || {};
      const researchCol = fastify.mongo.db.collection('research');

      const match = {};
      if (q) {
        const regex = new RegExp(q, 'i');
        match.$or = [{ title: { $regex: regex } }, { description: { $regex: regex } }];
      }
      if (category) {
        match.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }
      if (region) {
        match.region = { $regex: new RegExp(`^${region}$`, 'i') };
      }
      if (author) {
        try {
          match.createdBy = new ObjectId(author);
        } catch {
          return reply.code(400).send({ error: 'Некоректний ID автора' });
        }
      }

      const pipeline = [
        { $match: match },
        {
          $facet: {
            results: [
              { $project: { title: 1, category: 1, region: 1, date: 1, description: 1, image: 1, createdBy: 1, views: 1 } }
            ],
            categories: [
              { $group: { _id: '$category', count: { $sum: 1 } } },
              { $project: { _id: 0, name: '$_id', count: 1 } }
            ],
            authors: [
              { $group: { _id: '$createdBy', count: { $sum: 1 } } },
              {
                $lookup: {
                  from: 'users',
                  localField: '_id',
                  foreignField: '_id',
                  as: 'user'
                }
              },
              { $unwind: '$user' },
              { $project: { _id: '$user._id', name: '$user.name', count: 1 } }
            ]
          }
        }
      ];

      const data = await researchCol.aggregate(pipeline).toArray();
      const { results = [], categories = [], authors = [] } = data[0] || {};
      return { results, categories, authors };
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: 'Помилка пошуку' });
    }
  });
}
