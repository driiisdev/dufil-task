import { useForm } from 'react-hook-form';
import { IBook } from '../../types/bookTypes';

interface BookPopupProps {
  book?: IBook;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<IBook>) => void;
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
            <p>{book?.comment}</p>
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
              <select
                {...register('readingStatus', { required: 'Reading status is required' })}
                className="w-full p-2 border rounded"
              >
                <option value="read">Read</option>
                <option value="reading">Reading</option>
                <option value="want-to-read">Want to Read</option>
              </select>
            </div>

            <div>
              <input
                {...register('rating', {
                  required: 'Rating is required',
                  min: {
                    value: 1,
                    message: 'Rating must be between 1 and 5',
                  },
                  max: {
                    value: 5,
                    message: 'Rating must be between 1 and 5',
                  },
                })}
                type="number"
                min="1"
                max="5"
                placeholder="Rating (1-5)"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <textarea
                {...register('comment')}
                placeholder="please give your comment"
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
          className="absolute text-3xl h-10 w-10 border rounded-lg top-4 right-4 bg-red-500 hover:bg-red-700 text-white"
        >
          ×
        </button>
      </div>
    </div>
  );
};
