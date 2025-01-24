import {create} from 'zustand';
import { IBook } from '../types/bookTypes';

interface BookState {
  selectedBook: IBook | null;
  selectedBookId: string | null;
  setSelectedBook: (book: IBook | null) => void;
  setSelectedBookId: (id: string | null) => void;
}

export const useBookStore = create<BookState>((set) => ({
  selectedBook: null,
  selectedBookId: null,
  setSelectedBook: (book) => set({ selectedBook: book }),
  setSelectedBookId: (id) => set({ selectedBookId: id }),
}));
