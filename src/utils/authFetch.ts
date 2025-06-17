import { toast } from 'sonner';

export const authFetch = (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  if (!token) {
    toast.error('Спочатку увійдіть у систему');
    return Promise.reject(new Error('No token found'));
  }
  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  } as HeadersInit;

  return fetch(url, { ...options, headers });
};
