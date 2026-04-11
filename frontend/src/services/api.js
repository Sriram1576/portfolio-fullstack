import axios from 'axios';

const isBrowser = typeof window !== 'undefined';
const isLocal = isBrowser && ['localhost', '127.0.0.1'].includes(window.location.hostname);
const fallbackApi = isLocal
  ? 'http://localhost:5000/api'
  : 'https://api.subhamsadangi.dpdns.org/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || fallbackApi;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects API
export const projectsAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

// Skills API
export const skillsAPI = {
  getAll: (params) => api.get('/skills', { params }),
  getByCategory: () => api.get('/skills/grouped/category'),
  getById: (id) => api.get(`/skills/${id}`),
  create: (data) => api.post('/skills', data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
};

// Experience API
export const experienceAPI = {
  getAll: (params) => api.get('/experience', { params }),
  getById: (id) => api.get(`/experience/${id}`),
  create: (data) => api.post('/experience', data),
  update: (id, data) => api.put(`/experience/${id}`, data),
  delete: (id) => api.delete(`/experience/${id}`),
};

// Contact API
export const contactAPI = {
  getAll: (params) => api.get('/contact', { params }),
  getById: (id) => api.get(`/contact/${id}`),
  create: (data) => api.post('/contact', data),
  updateStatus: (id, data) => api.put(`/contact/${id}`, data),
  delete: (id) => api.delete(`/contact/${id}`),
  getStats: () => api.get('/contact/stats/summary'),
};

// Stats API
export const statsAPI = {
  getSummary: () => api.get('/stats/summary'),
};

export default api;
