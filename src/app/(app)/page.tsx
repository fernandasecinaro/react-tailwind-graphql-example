'use client';

import { useEffect, useState } from 'react';
import { Book } from '@/__generated__/graphql';
import Button from '@/components/ui/atoms/button';
import AddBookModal from '@/features/book/components/AddBookModal';
import BookItem from '@/features/book/components/BookItem';
import BookModal from '@/features/book/components/BookModal';
import useBooks from '@/features/book/hooks/useBooks';
import EditBookModal from '@/features/book/components/EditBookModal';

const LIMIT = 6;

export default function Home() {
  const { loading, error, data, fetchMore } = useBooks({
    offset: 0,
    limit: LIMIT,
  });
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isEditBookModalOpen, setIsEditBookModalOpen] = useState(false);

  const handleOpenModal = (book: Book) => {
    setSelectedBook(book);
    setIsBookModalOpen(true);
  };

  const handleOpenEditModal = (book: Book) => {
    setSelectedBook(book);
    setIsEditBookModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        fetchMore({
          variables: { offset: data?.books.results.length },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
              books: {
                ...prev.books,
                results: [
                  ...prev.books.results,
                  ...fetchMoreResult.books.results,
                ],
              },
            });
          },
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchMore, data?.books.results.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Books Dashboard</h1>
        <Button onClick={() => setIsAddBookModalOpen(true)}>Add Book</Button>
      </div>
      <div className="grid gap-8">
        {data?.books.results.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onOpenEditModal={handleOpenEditModal}
            onOpenBookModal={handleOpenModal}
          />
        ))}
      </div>
      {isBookModalOpen && (
        <BookModal
          isOpen={isBookModalOpen}
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
      {isAddBookModalOpen && (
        <AddBookModal
          isOpen={isAddBookModalOpen}
          onClose={() => setIsAddBookModalOpen(false)}
          onSuccess={() => setIsAddBookModalOpen(false)}
        />
      )}
      {isEditBookModalOpen && (
        <EditBookModal
          isOpen={isEditBookModalOpen}
          bookId={selectedBook?.id}
          onClose={() => setIsEditBookModalOpen(false)}
          onSuccess={() => setIsEditBookModalOpen(false)}
        />
      )}
    </div>
  );
}
