import { ObjectId } from 'mongodb';

export function validateComment(body = {}) {
  if (!body.text || typeof body.text !== 'string' || !body.text.trim()) {
    return 'Text is required';
  }
  return null;
}

export function createCommentDoc(researchId, userId, text) {
  return {
    researchId: new ObjectId(researchId),
    userId: new ObjectId(userId),
    text,
    date: new Date()
  };
}
