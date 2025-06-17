import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/auth.js";

export async function userRoutes(fastify) {
  fastify.addHook("onRequest", async (request, reply) => {
    if (!request.url.startsWith("/profile")) return;

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

  fastify.get("/profile", async (request, reply) => {
    const users = fastify.mongo.db.collection("users");
    const user = await users.findOne({ _id: new fastify.mongo.ObjectId(request.user.id) });

    if (!user) {
      return reply.code(404).send({ error: "Користувача не знайдено" });
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePicture: user.profilePicture || null,
      memberSince: user.createdAt,
    };
});

  fastify.put(
    '/profile',
    { preHandler: verifyToken },
    async (request, reply) => {
      const users = fastify.mongo.db.collection('users');
      const userId = new fastify.mongo.ObjectId(request.user.id);
      const { name, email, password } = request.body || {};

      const update = {};
      if (name) update.name = name;

      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return reply.code(400).send({ error: 'Невалідний email' });
        }
        const existing = await users.findOne({ email, _id: { $ne: userId } });
        if (existing) {
          return reply.code(400).send({ error: 'Email вже використовується' });
        }
        update.email = email;
      }

      if (password) {
        if (password.length < 6) {
          return reply
            .code(400)
            .send({ error: 'Пароль має містити щонайменше 6 символів' });
        }
        const bcrypt = await import('bcryptjs');
        const hashed = await bcrypt.default.hash(password, 10);
        update.password = hashed;
      }

      if (Object.keys(update).length === 0) {
        return reply.code(400).send({ error: 'Немає даних для оновлення' });
      }

      try {
        await users.updateOne({ _id: userId }, { $set: update });
        const updated = await users.findOne(
          { _id: userId },
          { projection: { password: 0 } }
        );
        return reply.send(updated);
      } catch (err) {
        request.log.error(err);
        return reply.code(500).send({ error: 'Помилка при оновленні' });
      }
    }
  );

  fastify.put('/profile/update', async (request, reply) => {
    const users = fastify.mongo.db.collection('users');
    const userId = new fastify.mongo.ObjectId(request.user.id);
    const { name, email, password, role } = request.body || {};

    const update = {};

    if (name) update.name = name;

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return reply.code(400).send({ error: 'Невалідний email' });
      }

      const existing = await users.findOne({ email, _id: { $ne: userId } });
      if (existing) {
        return reply.code(400).send({ error: 'Email вже використовується' });
      }
      update.email = email;
    }

    if (password) {
      if (password.length < 6) {
        return reply.code(400).send({ error: 'Пароль має містити щонайменше 6 символів' });
      }
      const bcrypt = await import('bcryptjs');
      const hashed = await bcrypt.default.hash(password, 10);
      update.password = hashed;
    }

    if (role && ['user', 'student', 'analyst', 'entrepreneur'].includes(role)) {
      update.role = role;
    }

    if (Object.keys(update).length === 0) {
      return reply.code(400).send({ error: 'Немає даних для оновлення' });
    }

    await users.updateOne({ _id: userId }, { $set: update });

    const updated = await users.findOne({ _id: userId });
    if (!updated) {
      return reply.code(404).send({ error: 'Користувача не знайдено' });
    }
    const { password: _, ...profile } = updated;
    return profile;
  });
}
