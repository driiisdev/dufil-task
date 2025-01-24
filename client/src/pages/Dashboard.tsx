import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BookCard } from '../components/Books/BookCard';
import { BookPopup } from '../components/Books/BookPopup';
import { booksAPI } from '../api/books';
import { IBook } from '../types/bookTypes';
import { BookResponse } from '../types/responseTypes';
import { useBookStore } from '../store/useBookStore';
import { useModalStore } from '../store/useModal';

export const Dashboard = () => {
  const queryClient = useQueryClient();
  const { selectedBook, setSelectedBook, selectedBookId, setSelectedBookId } = useBookStore();
  const {isCreateModalOpen, setIsCreateModalOpen} = useModalStore();
  
  const { data: allBooks, isLoading, isError } = useQuery({
    queryKey: ['user-books'],
    queryFn: booksAPI.getUserBooks
  });

  const books = allBooks?.data.books;

  const { data } = useQuery<BookResponse | null, Error>({
    queryKey: ['user-book', selectedBookId],
    queryFn: () => selectedBookId ? booksAPI.getUserBook(selectedBookId) : null,
    enabled: !!selectedBookId,
  });  

  const createMutation = useMutation<BookResponse, Error,
  Partial<IBook>, unknown>({
    mutationFn:booksAPI.createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['user-books'] 
      });
      setIsCreateModalOpen(false);
    },
  });

  const updateMutation = useMutation<BookResponse, Error,
  { id: string } & Partial<IBook>, unknown>({
    mutationFn: ({ id, ...data }) => booksAPI.updateBook(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-books'] });
      setIsCreateModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => booksAPI.deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['user-books']});
      setSelectedBook(null);
    },
  });

  useEffect(() => {
    if (data) {
      setSelectedBook(data.data.book);
    }
  }, [setSelectedBook, data]);

  if (isLoading) {
    return <p>Loading your books...</p>;
  }

  if (isError) {
    return <p>Failed to load books. Please try again later.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Books</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl"
        >
          +
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books?.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onClick={() => {
              setSelectedBookId(book.id);
            }}
          />
        ))}
      </div>

      {selectedBook && (
        <BookPopup
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => {
            setSelectedBook(null);
            setSelectedBookId(null);
          }}
          onSubmit={(data) =>
            updateMutation.mutate({ id: selectedBook.id, ...data })
          }
          onDelete={() => deleteMutation.mutate(selectedBook.id)}
          mode="edit"
        />
      )}

      {isCreateModalOpen && (
        <BookPopup
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={(data) => createMutation.mutate(data)}
          mode="create"
        />
      )}
    </div>
  );
};
