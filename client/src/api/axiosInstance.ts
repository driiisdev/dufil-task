import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const Axios = axios.create({
  baseURL: 'localhost:8080',
});

Axios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshedToken = await Axios.post('/api/v1/refresh-token');
      useAuthStore.getState().setAuth(refreshedToken.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${refreshedToken.data.token}`;
      return Axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default Axios;
