import { ObjectId } from 'mongodb';
import { verifyToken } from '../middleware/auth.js';
import { createCommentDoc, validateComment } from '../models/Comment.js';
import { isAuthorized } from '../utils/authorization.js';

export function addComment(fastify) {
  return async function(request, reply) {
    const { researchId } = request.params;
    const error = validateComment(request.body || {});
    if (error) {
      return reply.code(400).send({ error });
    }
    const comments = fastify.mongo.db.collection('comments');
    const doc = createCommentDoc(researchId, request.user.id, request.body.text);
    const result = await comments.insertOne(doc);
    return reply
      .code(201)
      .send({
        ...doc,
        _id: result.insertedId.toString(),
        researchId: doc.researchId.toString(),
        userId: doc.userId.toString(),
      });
  };
}

export function getCommentsByResearch(fastify) {
  return async function(request, reply) {
    const { researchId } = request.params;
    const commentsCol = fastify.mongo.db.collection('comments');
    const rawComments = await commentsCol
      .aggregate([
        { $match: { researchId: new ObjectId(researchId) } },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        { $unwind: '$user' },
        {
          $project: {
            _id: 1,
            researchId: 1,
            text: 1,
            date: 1,
            user: { _id: '$user._id', name: '$user.name' }
          }
        },
        { $sort: { date: -1 } }
      ])
      .toArray();
    const comments = rawComments.map((c) => ({
      ...c,
      _id: c._id.toString(),
      researchId: c.researchId.toString(),
      user: { ...c.user, _id: c.user._id.toString() },
    }));
    return reply.send({ comments });
  };
}

export function deleteComment(fastify) {
  return async function(request, reply) {
    const { id } = request.params;
    const comments = fastify.mongo.db.collection('comments');
    const comment = await comments.findOne({ _id: new ObjectId(id) });
    if (!comment) {
      return reply.code(404).send({ error: 'Comment not found' });
    }

    const researchCol = fastify.mongo.db.collection('research');
    const research = await researchCol.findOne({ _id: new ObjectId(comment.researchId) });

    const canDelete = isAuthorized(request.user, {
      userId: comment.userId,
      createdBy: research?.createdBy,
    });

    if (!canDelete) {
      return reply.code(403).send({ error: 'Forbidden' });
    }

    await comments.deleteOne({ _id: comment._id });
    return reply.send({ success: true });
  };
}

export function updateComment(fastify) {
  return async function(request, reply) {
    const { id } = request.params;
    const { text } = request.body || {};
    const comments = fastify.mongo.db.collection('comments');
    const comment = await comments.findOne({ _id: new ObjectId(id) });

    if (!comment) {
      return reply.code(404).send({ error: 'Not found' });
    }

    const researchCol = fastify.mongo.db.collection('research');
    const research = await researchCol.findOne({ _id: new ObjectId(comment.researchId) });

    const canEdit = isAuthorized(request.user, {
      userId: comment.userId,
      createdBy: research?.createdBy,
    });

    if (!canEdit) {
      return reply.code(403).send({ error: 'Forbidden' });
    }

    await comments.updateOne({ _id: comment._id }, { $set: { text } });
    return reply.send({ success: true });
  };
}

export default async function commentRoutes(fastify) {
  fastify.post('/comments/:researchId', { preHandler: verifyToken }, addComment(fastify));
  fastify.get('/comments/:researchId', getCommentsByResearch(fastify));
  fastify.put('/comments/:id', { preHandler: verifyToken }, updateComment(fastify));
  fastify.delete('/comments/:id', { preHandler: verifyToken }, deleteComment(fastify));
}
