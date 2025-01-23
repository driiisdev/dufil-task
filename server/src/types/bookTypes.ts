export interface IBook {
  id?: string;
  title?: string;
  author?: string;
  isPublic?: boolean
  readingStatus?: 'read' | 'reading' | 'want-to-read';
  rating: string;
  comments?: string;
}
