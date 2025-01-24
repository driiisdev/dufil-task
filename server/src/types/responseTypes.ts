import { IBook } from "./bookTypes";

export interface GetPublicBooksResponse {
  books: IBook[];
  total: string;
  totalPages: string;
  currentPage: string;
}

export interface SearchPublicBooksResponse {
  books: IBook[];
  total: string;
  totalPages: string;
  currentPage: string;
}

export interface GetUserBooksResponse {
  books: IBook[];
  total: string;
  totalPages: string;
  currentPage: string;
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
