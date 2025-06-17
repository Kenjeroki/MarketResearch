export async function statsRoutes(fastify) {
  const handler = async (request, reply) => {
    try {
      const collection = fastify.mongo.db?.collection("research");
      const users = fastify.mongo.db?.collection("users");

      if (!collection || !users) {
        return reply.code(500).send({ error: "Не вдалося знайти колекції" });
      }

      const researchCount = await collection.countDocuments();
      const viewsSum = await collection
        .aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }])
        .toArray();
      const usersCount = await users.countDocuments();

      return {
        research: researchCount,
        registrations: usersCount,
        visits: viewsSum[0]?.total || 0,
      };
    } catch (err) {
      console.error("❌ stats fetch error:", err);
      reply.code(500).send({ error: "Помилка при отриманні статистики" });
    }
  };

  fastify.get("/stats", handler);
  fastify.get("/dashboard/stats", handler);
}
