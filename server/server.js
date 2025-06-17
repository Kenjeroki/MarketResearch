import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import fastifyFormbody from "@fastify/formbody";
import fastifyMongo from "@fastify/mongodb";

import researchRoutes from "./routes/research.js";
import { categoryRoutes } from "./routes/categories.route.js";
import { statsRoutes } from "./routes/stats.route.js";
import { authRoutes } from "./routes/auth.route.js";
import { userRoutes } from "./routes/user.route.js";
import { favoritesRoutes } from "./routes/favorites.route.js";
import commentRoutes from "./routes/comments.js";
import { searchRoutes } from "./routes/search.route.js";

dotenv.config();

const fastify = Fastify({ logger: true });

await fastify.register(cors);
await fastify.register(fastifyFormbody);

await fastify.register(fastifyMongo, {
  forceClose: true,
  url: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017",
  database: process.env.DB_NAME || "prodexplorer"
});

const dbStatus = !!fastify.mongo?.db;
console.log("MongoDB підключено:", dbStatus ? "Так" : "Ні");

if (dbStatus) {
  await fastify.register(authRoutes);
  await fastify.register(userRoutes);
  await fastify.register(favoritesRoutes);
  await fastify.register(categoryRoutes);
  await fastify.register(researchRoutes);
  await fastify.register(searchRoutes);
  await fastify.register(commentRoutes);
  await fastify.register(statsRoutes);
  console.log("Зареєстровані всі маршрути");
} else {
  console.warn("⚠Маршрути не зареєстровані через відсутність підключення до MongoDB");
}

const PORT = process.env.PORT || 3000;
try {
  const address = await fastify.listen({ port: PORT });
  console.log(`Сервер працює за адресою ${address}`);
  fastify.printRoutes();
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
