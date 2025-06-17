import jwt from "jsonwebtoken";

export function verifyToken(request, reply, done) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return reply.code(401).send({ error: "Токен відсутній" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    done();
  } catch {
    reply.code(403).send({ error: "Недійсний токен" });
  }
}
