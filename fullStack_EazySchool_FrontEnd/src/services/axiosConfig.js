import axios from 'axios';

const API_BASE_URL = 'd1-production-2cfa.up.railway.app' || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add interceptor
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
