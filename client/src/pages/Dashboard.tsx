import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BookCard } from '../components/Books/BookCard';
import { BookPopup } from '../components/Books/BookPopup';
import { booksAPI } from '../api/books';
import { Book } from '../types';

export const Dashboard = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: books } = useQuery(['user-books'], booksAPI.getUserBooks);

  const createMutation = useMutation(booksAPI.createBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user-books']);
      setIsCreateModalOpen(false);
    },
  });

  const updateMutation = useMutation(
    ({ id, ...data }: Partial<Book> & { id: string }) =>
      booksAPI.updateBook(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user-books']);
        setSelectedBook(null);
      },
    }
  );

  const deleteMutation = useMutation(booksAPI.deleteBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user-books']);
      setSelectedBook(null);
    },
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">My Books</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl"
        >
          +
        </button>
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
        onSubmit={(data) =>
          updateMutation.mutate({ id: selectedBook!.id, ...data })
        }
        onDelete={() => deleteMutation.mutate(selectedBook!.id)}
        mode="edit"
      />

      <BookPopup
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        mode="create"
      />
    </div>
  );
};
