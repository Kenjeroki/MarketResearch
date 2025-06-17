import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function favoritesRoutes(fastify) {
  fastify.addHook("onRequest", async (request, reply) => {
    if (!request.url.startsWith("/favorites")) return;

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply.code(401).send({ error: "Відсутній токен авторизації" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
      request.user = decoded;
    } catch (err) {
      return reply.code(401).send({ error: "Невірний або прострочений токен" });
    }
  });

  fastify.post("/favorites/:id", async (request, reply) => {
    const users = fastify.mongo.db.collection("users");
    const researchCol = fastify.mongo.db.collection("research");
    const userId = new ObjectId(request.user.id);
    const researchId = new ObjectId(request.params.id);

    const research = await researchCol.findOne({ _id: researchId });
    if (!research) {
      return reply.code(404).send({ error: "Дослідження не знайдено" });
    }

    const user = await users.findOne({ _id: userId });
    if (!user) {
      return reply.code(404).send({ error: "Користувача не знайдено" });
    }

    if (user.favorites && user.favorites.find((f) => f.equals(researchId))) {
      return reply.code(400).send({ error: "Вже додано до вибраного" });
    }

    await users.updateOne({ _id: userId }, { $addToSet: { favorites: researchId } });
    return { success: true };
  });

  fastify.delete("/favorites/:id", async (request, reply) => {
    const users = fastify.mongo.db.collection("users");
    const userId = new ObjectId(request.user.id);
    const researchId = new ObjectId(request.params.id);

    await users.updateOne({ _id: userId }, { $pull: { favorites: researchId } });
    return { success: true };
  });

  fastify.get("/favorites", async (request, reply) => {
    const users = fastify.mongo.db.collection("users");
    const researchCol = fastify.mongo.db.collection("research");
    const userId = new ObjectId(request.user.id);

    const user = await users.findOne({ _id: userId });
    if (!user) {
      return reply.code(404).send({ error: "Користувача не знайдено" });
    }

    const favorites = user.favorites || [];
    if (favorites.length === 0) {
      return { favorites: [] };
    }

    const favResearch = await researchCol
      .find({ _id: { $in: favorites } })
      .toArray();

    const result = favResearch.map((item) => ({
      ...item,
      _id: item._id.toString(),
      createdBy: item.createdBy?.toString(),
    }));

    return { favorites: result };
  });
}
