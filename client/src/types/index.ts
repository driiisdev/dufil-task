export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Book {
  id?: string;
  userId?: string;
  title?: string;
  author?: string;
  readingStatus?: string[];
  rating?: number;
  notes?: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}
