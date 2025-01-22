export interface ICreateBookDto {
  title: string;
  author: string;
  picture?: string;
  isPublic: boolean;
  readingStatus: ReadingStatus;
  rating?: number;
  comment?: string;
}

export interface IUpdateBookDto {
  title?: string;
  author?: string;
  picture?: string;
  isPublic?: boolean;
  readingStatus?: ReadingStatus;
  rating?: number;
  comment?: string;
}

type ReadingStatus = 'read' | 'reading' | 'want-to-read';
