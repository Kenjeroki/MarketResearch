import { ObjectId } from "mongodb";
import { verifyToken } from "../middleware/auth.js";
import { createResearchDoc, validateResearch } from "../models/Research.js";
import { isAuthorized } from "../utils/authorization.js";

console.log("📢 researchRoutes loaded");

export default async function researchRoutes(fastify) {
  fastify.get("/research", async (request, reply) => {
    const collection = fastify.mongo.db.collection("research");
    const { search, region, category } = request.query;

    const query = {};
    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
      ];
    }
    if (region) {
      query.region = { $regex: new RegExp(`^${region}$`, "i") };
    }
    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    const data = await collection.find(query).toArray();
    return reply.send({ research: data });
  });

  fastify.post(
    "/research",
    { preHandler: verifyToken },
    async (request, reply) => {
      const error = validateResearch(request.body || {});
      if (error) {
        return reply.code(400).send({ error });
      }

      const collection = fastify.mongo.db.collection("research");
      const doc = createResearchDoc(request.body, request.user.id);
      const result = await collection.insertOne(doc);
      return reply.code(201).send({ ...doc, _id: result.insertedId });
    }
  );

  fastify.get("/research/popular", async (request, reply) => {
    const collection = fastify.mongo.db.collection("research");
    const popularResearch = await collection
      .find()
      .sort({ views: -1 })
      .limit(10)
      .toArray();
    return reply.send({ popularResearch });
  });

  fastify.get("/research/latest", async (request, reply) => {
    const collection = fastify.mongo.db.collection("research");
    const latestResearch = await collection
      .find()
      .sort({ date: -1 })
      .limit(15)
      .toArray();
    return reply.send({ latestResearch });
  });

  fastify.post("/research/:id/view", async (request, reply) => {
    const collection = fastify.mongo.db.collection("research");
    const { id } = request.params;
    try {
      await collection.updateOne({ _id: new ObjectId(id) }, { $inc: { views: 1 } });
      return reply.send({ message: "View count updated" });
    } catch (error) {
      return reply.code(400).send({ error: "Некоректний ID" });
    }
  });

  fastify.put(
    "/research/:id",
    { preHandler: verifyToken },
    async (request, reply) => {
      const { id } = request.params;
      let objectId;
      try {
        objectId = new ObjectId(id);
      } catch {
        return reply.code(400).send({ error: "Некоректний ID" });
      }

      const collection = fastify.mongo.db.collection("research");
      const research = await collection.findOne({ _id: objectId });
      if (!research) {
        return reply.code(404).send({ error: "Дослідження не знайдено" });
      }

      const canEdit = isAuthorized(request.user, { createdBy: research.createdBy });

      if (!canEdit) {
        return reply.code(403).send({ error: "Forbidden" });
      }

      const error = validateResearch(request.body || {});
      if (error) {
        return reply.code(400).send({ error });
      }

      const { charts, pie, bar, ...rest } = request.body;
      const pieData = charts?.pie || pie;
      const barData = charts?.bar || bar;
      const newCharts = [];
      if (Array.isArray(pieData) && pieData.length) {
        newCharts.push({
          type: "pie",
          title: "Графік pie",
          data: pieData,
        });
      }
      if (Array.isArray(barData) && barData.length) {
        newCharts.push({
          type: "bar",
          title: "Графік bar",
          data: barData,
        });
      }

      await collection.updateOne(
        { _id: objectId },
        {
          $set: {
            ...rest,
            charts: newCharts,
          },
        }
      );

      const updated = await collection.findOne({ _id: objectId });
      return reply.send(updated);
    }
  );

  fastify.delete(
    "/research/:id",
    { preHandler: verifyToken },
    async (request, reply) => {
      const { id } = request.params;
      let objectId;
      try {
        objectId = new ObjectId(id);
      } catch {
        return reply.code(400).send({ error: "Некоректний ID" });
      }

      const collection = fastify.mongo.db.collection("research");
      const research = await collection.findOne({ _id: objectId });
      if (!research) {
        return reply.code(404).send({ error: "Дослідження не знайдено" });
      }

      const canDelete = isAuthorized(request.user, { createdBy: research.createdBy });
      if (!canDelete) {
        return reply.code(403).send({ error: "Forbidden" });
      }

      const result = await collection.deleteOne({ _id: objectId });
      if (result.deletedCount === 0) {
        return reply.code(404).send({ error: "Дослідження не знайдено" });
      }

      return reply.send({ success: true });
    }
  );

  fastify.get("/my-researches", { preHandler: verifyToken }, async (request) => {
    const collection = fastify.mongo.db.collection("research");
    const researches = await collection
      .find({ createdBy: new ObjectId(request.user.id) })
      .toArray();
    return { researches };
  });

  fastify.get("/research/:id", async (request, reply) => {
    const collection = fastify.mongo.db.collection("research");
    const { id } = request.params;
    try {
      const objectId = new ObjectId(id);
      const research = await collection.findOne({ _id: objectId });

      if (!research) {
        return reply.code(404).send({ message: "Дослідження не знайдено" });
      }

      return reply.send(research);
    } catch (error) {
      console.error("❌ Помилка при пошуку:", error);
      return reply.code(400).send({ error: "Некоректний ID" });
    }
  });

  console.log("📢 researchRoutes executed and finished registering routes ✅");
}
