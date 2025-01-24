import Axios from './axiosInstance';
import { IBook } from '../types/bookTypes';
import { BookResponse, BooksResponse, SuccessResponse } from '../types/responseTypes';

export const booksAPI = {
  getPublicBooks: (page = 1) =>
    Axios.get<BooksResponse>('/api/v1/books/public', {
      params: { page },
    }),

  searchPublicBooks: (query: string) =>
    Axios.get<BooksResponse>('/api/v1/books/public/search', { params: { query } }).then((response) => response.data),

  getPublicBook: (id: string) =>
    Axios.get<BookResponse>(`/api/v1/books/public/${id}`).then((response) => response.data),

  getUserBooks: () =>
    Axios.get<BooksResponse>('/api/v1/books').then((response) => response.data),

  getUserBook: (id: string) =>
    Axios.get<BookResponse>(`/api/v1/books/${id}`).then((response) => response.data),

  createBook: (data: Partial<IBook>) =>
    Axios.post<BookResponse>('/api/v1/books', data).then((response) => response.data),

  updateBook: (id: string, data: Partial<IBook>) =>
    Axios.patch<BookResponse>(`/api/v1/books/${id}`, data).then((response) => response.data),

  deleteBook: (id: string) =>
    Axios.delete<SuccessResponse>(`/api/v1/books/${id}`).then((response) => response.data),
};
