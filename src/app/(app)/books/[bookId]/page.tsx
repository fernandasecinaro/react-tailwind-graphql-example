'use client';

import Button from '@/components/ui/atoms/button';
import { useBookDetail } from '@/features/book/hooks/useBook';
import useDeleteBook from '@/features/book/hooks/useDeleteBook';
import { use } from 'react';
import { useRouter } from 'next/navigation';

export default function BookDetail({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = use(params);
  const { book } = useBookDetail({ id: bookId });
  const [deleteBook] = useDeleteBook();
  const router = useRouter();

  const handleRemoveBook = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!book) return;

    deleteBook({
      variables: { deleteBookId: book.id },
      onCompleted: () => {
        console.log('Book removed successfully');
        router.push('/');
      },
    });
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">{book?.title}</h2>
          <p className="text-sm text-gray-500">{book?.author}</p>
          <p className="text-sm text-gray-500">{book?.year}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleRemoveBook}>Remove</Button>
        </div>
      </div>
    </div>
  );
}
