export interface IUser {
  id: string;
  username: string,
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserCredentials {
  username: string,
  email: string;
  password: string;
}

