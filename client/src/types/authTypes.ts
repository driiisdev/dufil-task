export interface IUser {
  id: string;
  email: string;
  username: string;
}

export interface IRegisterData {
  username: string;
  email: string;
  password: string;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface ILoginData extends IToken{
  user: IUser
}

export interface IAccessToken {
  accessToken: string;
}

export interface IRefreshToken {
  accessToken: string;
}

export interface IToken extends IAccessToken {
  refreshToken: string;
}
