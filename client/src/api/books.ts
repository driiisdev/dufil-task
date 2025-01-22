import Axios from './axiosInstance';
import { Book } from '../types';

export const booksAPI = {
  getPublicBooks: (page = 1) => 
    Axios.get<Book[]>('/books/public', { params: { page } }),
  
  searchPublicBooks: (query: string) => 
    Axios.get<Book[]>('/books/public/search', { params: { query } }),
  
  getPublicBook: (id: string) => 
    Axios.get<Book>(`/books/public/${id}`),
  
  getUserBooks: () => 
    Axios.get<Book[]>('/books'),
  
  createBook: (data: Partial<Book>) => 
    Axios.post<Book>('/books', data),
  
  updateBook: (id: string, data: Partial<Book>) => 
    Axios.patch<Book>(`/books/${id}`, data),
  
  deleteBook: (id: string) => 
    Axios.delete(`/books/${id}`),
};
