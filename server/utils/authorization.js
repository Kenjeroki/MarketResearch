export function isAuthorized(user, resource = {}) {
  if (!user) return false;
  const userId = user.id;
  const isAdmin = user.role === 'admin';
  const isOwner = resource.userId && resource.userId.toString() === userId;
  const isAuthor = resource.createdBy && resource.createdBy.toString() === userId;
  return isOwner || isAuthor || isAdmin;
}
