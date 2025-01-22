import Axios from './axiosInstance';

export interface AuthResponse {
  token: string;
  user: User;
}

export const authAPI = {
  register: (data: RegisterData) => 
    Axios.post<AuthResponse>('/register', data),
  
  login: (data: LoginData) => 
    Axios.post<AuthResponse>('/login', data),
  
  logout: () => 
    Axios.post('/logout'),
  
  refreshToken: () => 
    Axios.post<AuthResponse>('/refresh-token'),
};
