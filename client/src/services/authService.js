import api from './api';

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: (token) => api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  })
};
