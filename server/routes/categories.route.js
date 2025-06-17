
export async function categoryRoutes(fastify) {
  fastify.get("/categories", async (request, reply) => {
    try {
      const db = fastify.mongo.db;
      const collection = db.collection("research");

      const pipeline = [
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            count: 1
          }
        }
      ];

      const categories = await collection.aggregate(pipeline).toArray();

      const formatted = categories.map((c) => ({
        ...c,
        slug: c.name.toLowerCase().replace(/\s+/g, "-"),
      }));

      return { categories: formatted };
    } catch (err) {
      console.error("❌ Category fetch error:", err);
      reply.code(500).send({ error: err.message || "Помилка при отриманні категорій" });
    }
  });
}
