import axios from 'axios';

const isBrowser = typeof window !== 'undefined';
const isLocal = isBrowser && ['localhost', '127.0.0.1'].includes(window.location.hostname);
const fallbackApi = isLocal
  ? 'http://localhost:5000/api'
  : 'https://api.subhamsadangi.dpdns.org/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || fallbackApi;
const REQUEST_TIMEOUT_MS = Number(process.env.REACT_APP_API_TIMEOUT_MS || 8000);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableError = (error) => {
  if (!error) return false;
  if (!error.response) return true;
  return error.response.status >= 500;
};

const withRetry = async (requestFn, retries = 1, retryDelayMs = 600) => {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      if (attempt === retries || !isRetryableError(error)) {
        throw error;
      }
      await wait(retryDelayMs * (attempt + 1));
    }
  }
  throw lastError;
};

// Projects API
export const projectsAPI = {
  getAll: (params) => withRetry(() => api.get('/projects', { params })),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

// Skills API
export const skillsAPI = {
  getAll: (params) => withRetry(() => api.get('/skills', { params })),
  getByCategory: () => api.get('/skills/grouped/category'),
  getById: (id) => api.get(`/skills/${id}`),
  create: (data) => api.post('/skills', data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
};

// Experience API
export const experienceAPI = {
  getAll: (params) => withRetry(() => api.get('/experience', { params })),
  getById: (id) => api.get(`/experience/${id}`),
  create: (data) => api.post('/experience', data),
  update: (id, data) => api.put(`/experience/${id}`, data),
  delete: (id) => api.delete(`/experience/${id}`),
};

// Aggregated Home Content API
export const contentAPI = {
  getHome: () => withRetry(() => api.get('/content/home'), 1, 500),
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
