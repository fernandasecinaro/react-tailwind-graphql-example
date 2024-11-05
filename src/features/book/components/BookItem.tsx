import Button from '@/components/ui/atoms/button';
import useDeleteBook from '../hooks/useDeleteBook';
import { Book } from '@/__generated__/graphql';
import { useRouter } from 'next/navigation';

interface BookItemProps {
  book: Book;
  onOpenBookModal: (book: Book) => void;
  onOpenEditModal: (book: Book) => void;
}

const BookItem: React.FC<BookItemProps> = ({
  book,
  onOpenBookModal,
  onOpenEditModal,
}) => {
  const router = useRouter();
  const [deleteBook] = useDeleteBook();

  const handleRemoveBook = (e: React.MouseEvent) => {
    e.stopPropagation();

    deleteBook({
      variables: { deleteBookId: book.id },
      onCompleted: () => {
        console.log('Book removed successfully');
      },
    });
  };

  const handleEditBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenEditModal(book);
  };

  const handleSeeDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/books/${book.id}`);
  };

  return (
    <div
      onClick={() => onOpenBookModal(book)}
      className="p-4 border border-gray-200 rounded-lg cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">{book.title}</h2>
          <p className="text-sm text-gray-500">{book.author}</p>
          <p className="text-sm text-gray-500">{book.year}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleSeeDetails}>See details</Button>
          <Button onClick={handleEditBook}>Edit</Button>
          <Button onClick={handleRemoveBook}>Remove</Button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
