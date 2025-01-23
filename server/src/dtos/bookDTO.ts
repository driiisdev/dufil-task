export interface ICreateBookDto {
  title: string;
  author: string;
  isPublic: boolean;
  readingStatus: ReadingStatus;
  rating?: string;
  comment?: string;
}

export interface IUpdateBookDto {
  title?: string;
  author?: string;
  isPublic?: boolean;
  readingStatus?: ReadingStatus;
  rating?: string;
  comment?: string;
}

type ReadingStatus = 'read' | 'reading' | 'want-to-read';
