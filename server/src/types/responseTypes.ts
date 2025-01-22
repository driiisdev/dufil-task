import { IBook } from "./bookTypes";

export interface GetPublicBooksResponse {
  books: IBook[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface SearchPublicBooksResponse {
  books: IBook[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface GetUserBooksResponse {
  books: IBook[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface GetBookResponse {
  book: IBook;
}

export interface CreateBookResponse {
  book: IBook;
}

export interface UpdateBookResponse {
  book: IBook;
}

export interface DeleteBookResponse {
  message: string;
}
