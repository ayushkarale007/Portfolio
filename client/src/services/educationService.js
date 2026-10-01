import api from './api';

export const educationService = {
  getAll: () => api.get('/education'),
  create: (data) => api.post('/education', data),
  update: (id, data) => api.put(`/education/${id}`, data),
  remove: (id) => api.delete(`/education/${id}`)
};
