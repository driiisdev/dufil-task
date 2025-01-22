import { useForm } from 'react-hook-form';
import { Book } from '../../types';

interface BookPopupProps {
  book?: Book;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Book>) => void;
  onDelete?: () => void;
  mode: 'view' | 'create' | 'edit';
}

export const BookPopup = ({
  book,
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  mode
}: BookPopupProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: book || {},
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        {mode === 'view' ? (
          <div>
            <h2 className="text-xl font-bold mb-4">{book?.title}</h2>
            <p className="text-gray-600 mb-2">By {book?.author}</p>
            <p>{book?.description}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register('title')}
                placeholder="Title"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <input
                {...register('author')}
                placeholder="Author"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <textarea
                {...register('description')}
                placeholder="Description"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('isPublic')}
                className="mr-2"
              />
              <label>Make public</label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              {mode === 'create' ? 'Create Book' : 'Update Book'}
            </button>
            {mode === 'edit' && onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 mt-2"
              >
                Delete Book
              </button>
            )}
          </form>
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
    </div>
  );
};
