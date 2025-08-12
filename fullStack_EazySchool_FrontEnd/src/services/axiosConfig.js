// src/services/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // backend URL
});

// Add interceptor
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
      // console.log('🔐 Adding token to headers:', token); // ✅ Debug log
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
