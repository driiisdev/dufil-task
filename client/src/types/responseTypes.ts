import { IAccessToken, ILoginData } from "./authTypes";
import { IUser } from "./authTypes";
import { IBook } from "./bookTypes";

export interface SuccessResponse {
  message: string;
}

export interface RegisterResponse extends SuccessResponse {
  data: IUser;
}
export interface LoginResponse extends SuccessResponse {
  data: ILoginData;
}

export interface TokenResponse extends SuccessResponse {
  message: string;
  data: IAccessToken;
}

export interface BookResponse extends SuccessResponse {
  data: {
    book:IBook
  };
}

export interface BooksResponse extends SuccessResponse {
  data: {
    books: IBook[];
    total: string;
    totalPages: string;
    currentPage: string;
  };
}
