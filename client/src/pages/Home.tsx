import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookCard } from '../components/Books/BookCard';
import { BookPopup } from '../components/Books/BookPopup';
import { SearchBox } from '../components/Books/SearchBox';
import { booksAPI } from '../api/books';
import { Book } from '../types';

export const Home = () => {
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const { data: books } = useQuery(
    ['public-books', search],
    () => booksAPI.searchPublicBooks(search),
    { keepPreviousData: true }
  );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <SearchBox value={search} onChange={setSearch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books?.data.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onClick={() => setSelectedBook(book)}
          />
        ))}
      </div>

      <BookPopup
        book={selectedBook || undefined}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        onSubmit={() => {}}
        mode="view"
      />
    </div>
  );
};
