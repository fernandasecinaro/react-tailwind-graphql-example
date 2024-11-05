import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAddBook } from '../hooks/useAddBook';
import Button from '@/components/ui/atoms/button';

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  year: z.number().min(1000, 'Year is required').max(new Date().getFullYear()),
});

type BookFormData = z.infer<typeof bookSchema>;

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddBookModal = ({ isOpen, onClose, onSuccess }: AddBookModalProps) => {
  const [addBook, { loading, error: mutationError }] = useAddBook();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
    },
  });

  const onSubmit = async (data: BookFormData) => {
    addBook({
      variables: {
        ...data,
      },
      onCompleted: () => {
        onSuccess();
        onClose();
        reset();
      },
      onError: (error) => {
        console.error('Error adding book:', error);
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add New Book</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              {...register('title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Author *
            </label>
            <input
              type="text"
              id="author"
              {...register('author')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600">
                {errors.author.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="publishedYear"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Published Year
            </label>
            <input
              type="number"
              id="year"
              {...register('year', { valueAsNumber: true })}
              min="1000"
              max={new Date().getFullYear()}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.year && (
              <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
            )}
          </div>

          {mutationError && (
            <p className="text-red-500 text-sm">
              Error: {mutationError.message}
            </p>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <Button onClick={onClose}>Cancel</Button>
            <Button disabled={loading}>
              {loading ? 'Adding...' : 'Add Book'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
