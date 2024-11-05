import { Book } from '@/__generated__/graphql';

interface BookModalProps {
  isOpen: boolean;
  book: Book | null;
  onClose: () => void;
}

const BookModal: React.FC<BookModalProps> = ({ book, onClose, isOpen }) => {
  if (!isOpen || !book) return null;

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full m-4"
        onClick={handleContentClick}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{book.title}</h2>
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

        <div className="space-y-4 gap-y-1">
          <div className="flex gap-x-2 items-center">
            <h3 className="text-lg font-bold">Author</h3>
            <p className="text-sm text-gray-500">{book.author}</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <h3 className="text-lg font-bold">Year</h3>
            <p className="text-sm text-gray-500">{book.year}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
