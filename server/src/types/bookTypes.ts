export interface IBook {
  id?: string;
  userId?: string;
  title?: string;
  author?: string;
  readingStatus?: 'read' | 'reading' | 'want-to-read';
  rating?: number;
  notes?: string;
}
