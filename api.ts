
import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: (import.meta as any).env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for errors and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (Token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw new Error('No refresh token');

        const res = await axios.post(`${api.defaults.baseURL}/auth/refresh`, { refreshToken });
        const { access_token } = res.data;

        localStorage.setItem('access_token', access_token);
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/#/login';
        return Promise.reject(refreshError);
      }
    }

    // Global Error Toasts
    const message = error.response?.data?.message || 'A system error occurred';
    if (Array.isArray(message)) {
      message.forEach(msg => toast.error(msg));
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;
