import { ILoginCredentials, IRegisterData } from '../types/authTypes';
import { LoginResponse, RegisterResponse, SuccessResponse } from '../types/responseTypes';
import Axios from './axiosInstance';


export const authAPI = {
  register: (data: IRegisterData) => 
    Axios.post<RegisterResponse>('/api/v1/register', data),

  login: (data: ILoginCredentials) => 
    Axios.post<LoginResponse>('/api/v1/login', data),

  logout: () => 
    Axios.post<SuccessResponse>('/api/v1/logout'),
};
