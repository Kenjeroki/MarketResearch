import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function authRoutes(fastify) {
  fastify.post("/register", async (request, reply) => {
  const users = fastify.mongo.db.collection("users");
  const { email, password, name } = request.body;

  const existing = await users.findOne({ email });
  if (existing) {
    return reply.code(400).send({ error: "Користувач вже існує" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await users.insertOne({
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
    role: 'user',
    favorites: [],
  });

  return { success: true, userId: result.insertedId };
});

fastify.post("/login", async (request, reply) => {
  const users = fastify.mongo.db.collection("users");
  const { email, password } = request.body;

  const user = await users.findOne({ email });
  if (!user) return reply.code(401).send({ error: "Невірна пошта або пароль" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return reply.code(401).send({ error: "Невірна пошта або пароль" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "7d" }
  );

  return {
    token,
    id: user._id,
    name: user.name,
    email: user.email,
    memberSince: user.createdAt,
    role: user.role,
  };
  });
}
