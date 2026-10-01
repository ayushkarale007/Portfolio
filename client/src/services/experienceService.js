import api from './api';

export const experienceService = {
  getAll: () => api.get('/experience'),
  create: (data) => api.post('/experience', data),
  update: (id, data) => api.put(`/experience/${id}`, data),
  remove: (id) => api.delete(`/experience/${id}`)
};
