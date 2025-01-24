import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { TokenResponse } from '../types/responseTypes';

const Base_URL = import.meta.env.VITE_API_URL;

const Axios = axios.create({
  baseURL: Base_URL|| 'http://localhost:8080',
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshedTokenResponse = await Axios.post<TokenResponse>('/api/v1/refresh-token');
        const refreshedToken = refreshedTokenResponse.data.data.accessToken;

        useAuthStore.getState().setAuth(refreshedToken);
        Axios.defaults.headers.common['Authorization'] = `Bearer ${refreshedToken}`;

        return Axios(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default Axios;
