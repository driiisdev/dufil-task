export interface IBook {
  id: string;
  userId?: string;
  title?: string;
  author?: string;
  isPublic?: boolean;
  readingStatus?: string;
  rating?: string;
  comment?: string | null;
}
