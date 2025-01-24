import { IBook } from '../../types/bookTypes';

interface BookCardProps {
  book: IBook;
  onClick: () => void;
}

export const BookCard = ({ book, onClick }: BookCardProps) => (
  <div
    onClick={onClick}
    className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
  >
    <h3 className="font-bold text-lg">{book.title}</h3>
    <p className="text-gray-600">{book.author}</p>
    <p className="text-gray-500 text-sm mt-2 line-clamp-2">{book.comment}</p>
  </div>
);
