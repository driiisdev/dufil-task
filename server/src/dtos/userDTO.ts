export interface UserDTO {
  id: string;
  username: string;
  email: string;
}

export interface UserRegisterResponseDTO {
  id: string;
  username: string;
  email: string;
}

export interface LoginResponseDTO {
  user: UserDTO;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponseDTO {
  accessToken: string
}

export interface LogoutResponseDTO {
  message: string;
}
